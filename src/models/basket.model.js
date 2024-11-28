var dbConn = require("../../config/db.config");
const EventEmitter = require('events');
//const { format } = require("date-fns");

const event = new EventEmitter();

//variables to store customers basket 
let basketid;
let customerid;
let basketProducts = [];
let basketQuantity;
let totalamount;
let purchasedate;
let paymentMethod;

// Declare a global variable to store product prices
let customerBasketPrices = [];

//variables to store all times linked too the customer basket
let product_price;
let discountapplied = 0

//store customer loyalty
let customersLoyaltyTier;

//basket_id, customer_id, product, quantity, product_price, discount_applied, final_price, insertion_time

//product details
let invProductPrice;
let itemcode;
let sellingPrice;
let specialPriceIncl;

//product specials
let specialid;
let special;
let groupspecialid;
let specialprice;
let specialvalue;
let specialtype;
let startdate;
let expirydate;

//calculate
let newDiscountedPrice
let newTotalDiscBasketAmount;

let insertTime = new Date();

var Basket = function (user) {
        this.basket_id = user.basket_id;
        this.customer_id = user.customer_id;
        this.purchase_date = user.purchase_date;
        this.total_amount = user.total_amount;
        this.created_at = user.created_at;
};

//EVENT LISTENERS BELOW
// Event listener to trigger getProductPrices automatically
event.on('get-product-prices', (products) => {
    // Call the getProductPrices function directly, passing the products
    console.log("Triggering getProductPrices event listener...");
    Basket.getProductPrices(products, (err, prices) => {
        if (err) {
            console.error("Error fetching product prices:", err);
        } else {
            console.log("Product prices fetched successfully:", prices);
        }
    });
});

// Event listener for saveCustomerBasketItems
event.on('save-customer-basket-items', () => {
    console.log("Triggering saveCustomerBasketItems event listener...");
    Basket.saveCustomerBasketItems((err, res) => {
        if (err) {
            console.error("Error saving customer basket items:", err);
        } else {
            console.log("Customer basket items saved successfully:", res);
            event.emit('check-loyalty-customer'); // Trigger the next step
        }
    });
});

// Event listener for triggering checkLoyaltyCustomer
event.on('check-loyalty-customer', () => {
    console.log("Triggering checkLoyaltyCustomer event listener...");
    Basket.checkLoyaltyCustomer(customerid, (err, res) => {
        if (err) {
            console.error("Error checking loyalty customer:", err);
        } else {
            console.log("Loyalty customer checked successfully:", res);
        }
    });
});

// Event listener to trigger getProductSpecials
event.on('get-product-specials', (product) => {
    console.log("Triggering getProductSpecials event listener...");
    Basket.getProductSpecials(product, (err, specials) => {
        if (err) {
            console.error("Error fetching product specials:", err);
        } else {
            console.log("Product specials fetched successfully:", specials);

            // Check if any specials were returned
            if (specials && specials.length > 0) {
                console.log("Individual Product Special found, proceeding with combined specials check...");
            } else {
                console.log("No Individual Specials found for the product, still proceeding with combined specials check...");
            }
        }
    });
});

// Event listener to trigger getProductCombinedSpecials
event.on('get-product-combined-specials', (product) => {
    console.log("Triggering getProductCombinedSpecials event listener...");
    Basket.getProductCombinedSpecials(product, (err, combinedSpecials) => {
        if (err) {
            console.error("Error fetching combined specials:", err);
        } else {
            console.log("Combined specials fetched successfully:", combinedSpecials);
        }
    });
});

//QUERIES THAT GET TRIGGERED BY THE EVENTS
Basket.saveCustomerBasket = (req, result) => {
    const { basket_id, customer_id, product, quantity, purchase_date, total_amount, payment_method } = req.body;

    //assign values to global variables
    basketid = basket_id;
    customerid = customer_id;
    basketProducts = product;
    basketQuantity = quantity;
    totalamount = total_amount;
    purchasedate = purchase_date;
    paymentMethod = payment_method;

    // Log the assigned values for debugging
    console.log('Global Variables Assigned:', {
        basketid,
        customerid,
        basketProducts,
        quantity,
        totalamount,
        purchasedate,
        paymentMethod,
    });

    dbConn.query('INSERT INTO store_loyalty.tblbasketinfo(basket_id, customer_id, purchase_date, total_amount, payment_method)VALUES(?, ?, ?, ?, ?)', [basket_id, customer_id, purchase_date, total_amount, payment_method], (err, res) => {
        if (err) {
            console.log('Error while saving the customers basket:' + err);
            result(err, null);
        } else {
            console.log('Saving the customers basket was Successful:', res);
            result(null, res);

            event.emit('get-product-prices', product);
        }
    });
}

Basket.getProductPrices = (product, result) => {
    console.log('Products in Basket', basketProducts); 

    if (!Array.isArray(basketProducts) || basketProducts.length === 0) {
        return result({ message: 'No products provided in the basket'}, null)
    }

    const query = 'SELECT mstn.id, mstn.selling_incl_1, mstn.special_price_incl, COALESCE(inv.description_1, inv.description_2) AS description FROM store_loyalty.tblmultistoretrn mstn JOIN store_loyalty.tblinventory inv ON mstn.item_code = inv.item_code WHERE COALESCE(inv.description_1, inv.description_2) = ?'

    const queries = basketProducts.map((product) => {
        return new Promise((resolve, reject) => {
            dbConn.query(query, [product], (err, res) => {
                if (err) {
                    console.error(`Error fetching price for product: ${product}`, err);
                    reject(err);
                } else if (res.length === 0) {
                    console.log(`No price found for product: ${product}`);
                    resolve({ product, message: "Price not found" });
                } else {
                    resolve({ product, prices: res})
                }
            })
        })
    })

    Promise.all(queries)
        .then((results) => {
            console.log('Product prices retrieved successfully:', results)

            customerBasketPrices = results; // Save results to the global variable
            result(null, results); //send all results to the controller

            // Emit event to trigger saveCustomerBasketItems
            event.emit('save-customer-basket-items');
        })
        .catch((err) => {
            console.error('Error fetching product prices:', err);
            result(err, null);
        })
};

Basket.saveCustomerBasketItems = (req, result) => {
    // const ticketDate = format(
    //     new Date(),
    //     "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX"
    // );

    const basketID = basketid
    const customerID = customerid

    // Ensure there are product prices available
    if (!customerBasketPrices.length) {
            console.error('No product prices found. Proceeding with zero price for all products.');
    }

    // Set the current time for insertion
    const insertionTime = new Date().toISOString();

    //process each product in customersBasketPrices
    const queries = customerBasketPrices.map(({ product, prices}, index) => {
        const price = prices?.[0]?.selling_incl_1 || 0;

        // Retrieve the quantity for the product from the global variable (basketQuantity)
        // Assuming basketQuantity corresponds to the same index as the product
        const quantity = basketQuantity?.[index] || 1;

        const query = `INSERT INTO store_loyalty.tblbasketinfo_items(basket_id, customer_id, product, quantity, product_price, insertion_time)VALUES(?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            dbConn.query(query, [basketID, customerID, product, quantity, price, insertionTime], (err, res) => {
                if (err) {
                    console.error(`Error saving item: ${product}`, err); // log any error that occurs
                    reject(err);
                } else {
                    console.log(`Item saved successsfully: ${product}`); // log success
                    event.emit('check-loyalty-customer');
                }
            });
        });
    });

    Promise.all(queries)
        .then((results) => {
            console.log('All basket items saved successfully.'); // log success message
            result(null, results); // return results to the callback
        })
        .catch((err) => {
            console.error('Error saving customer basket items:', err); // log error message
            result(err, null); //return error to callback
        })


    // dbConn.query(`INSERT INTO store_loyalty.tblbasketinfo_items(${basketid}, ${customerid}, ${products}, ${basketQuantity}, ${product_price}, insertion_time)VALUES(?, ?, ?, ?, ?, ?)`, (err, res) => {
    //     if (err) {
    //         console.log('Error while saving the customers basket items:' + err);
    //         result(err, null);
    //     } else {
    //         console.log('Saving the customers basket items was Successful:', res);
    //         result(null, res);
    //     }
    // });
}

Basket.checkLoyaltyCustomer = (customerId, result) => {
    //console.log("Checking loyalty for customer with ID:", customerId);
    const customerID = customerid

        dbConn.query('SELECT CustomerID, LoyaltyTier FROM store_loyalty.tblloyaltycustomers WHERE CustomerID = ?', [customerID], (err, res) => {
            if (err) {
                //console.log('Error while checking if the customer is apart of the loyalty program' + err);
                result(null, err);
            } else if (res.length === 0) {
                console.log('No customer found with the provided ID.');
                result(null, null);  // No customer found
            } else {
                //console.log('The Customer is apart of the loyalty program', res);
                result(null, res);

                // Trigger getProductCombinedSpecials regardless of specials result
                event.emit('get-product-specials', basketProducts);
            }
        });
}

//basketProducts
Basket.getProductSpecials = (product, result) => {
        dbConn.query(`SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1 AND spi.product_description = ? AND sp.start_date <= CURDATE() AND sp.expiry_date >= CURDATE()`, [product], (err, res) => {
            if (err) {
                //console.log('Error while checking the product specials for the purchased item' + err);
                result(null, err);
            } else {
                //console.log('Successfully retrieved the special using the basket infomation', res);
                result(null, res);

                // Trigger getProductCombinedSpecials regardless of specials result
                event.emit('get-product-combined-specials', product);
            }
        });
}

Basket.getProductCombinedSpecials = (product, result) => {
    dbConn.query(`SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spcg.special_group_id, spcg.product_description, spcg.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecials_combinedgroup spcg ON sp.special_id = spcg.special_id  WHERE sp.special_type = 'Combined Special' AND sp.isActive = 1 AND spcg.product_description = ? AND sp.start_date <= CURDATE() AND sp.expiry_date >= CURDATE()`, [product], (err, res) => {
        if (err) {
            //console.log('Error while checking the product specials for the purchased item' + err);
            result(null, err);
        } else {
            //console.log('Successfully retrieved the special using the basket infomation', res);
            result(null, res);
        }
    });
}

Basket.saveBasketInfoItems = (basketid, customerid, product, quantity, sellingPrice, discountapplied, totalamount, insertTime, result) => {
    dbConn.query('INSERT INTO store_loyalty.tblbasketinfo_items(basket_id, customer_id, product, quantity, product_price, discount_applied, final_price, insertion_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate], (err, res) => {
        if (err) {
            //console.log('Error while checking the product specials for the purchased item' + err);
            result(null, err);
        } else {
            //console.log('Successfully retrieved the special using the basket infomation', res);
            result(null, res);
        }
    });
}

Basket.saveFinalTransaction = (basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate, result) => {
        dbConn.query('INSERT INTO store_loyalty.tblcompletetransaction(basket_id, customer_id, purchased_product, quantity, product_amount, product_discounted_amount, total_basket_amount, total_disc_basket_amount, purchase_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate], (err, res) => {
            if (err) {
                //console.log('Error while checking the product specials for the purchased item' + err);
                result(null, err);
            } else {
                //console.log('Successfully retrieved the special using the basket infomation', res);
                result(null, res);
            }
        });
}

// event.emit('get-customer-basket', 16)


module.exports = Basket;