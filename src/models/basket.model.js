var dbConn = require("../../config/db.config");
const EventEmitter = require('events');
//const { format } = require("date-fns");

const event = new EventEmitter();

//variables to store customers basket 
let basketid;
let customerid;
let basketProducts;
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

//listener for the 'get-customer-basket' event
event.on('get-customer-basket', (basketId) => {
        console.log('Retrieved basket information', basketId);
        
        // Call the getCustomerBasketItems method
        Basket.getCustomerBasket(basketId, (err, total_basket_amount) => {
            if (err) {
                console.error('Error retrieving basket total_basket_amount:', err);
            } else {
                console.log('Customers total basket', total_basket_amount);
                // Further processing of basket items...

                if (total_basket_amount && total_basket_amount.length > 0) {
                    basketid = total_basket_amount[0].basket_id;
                    customerid = total_basket_amount[0].customer_id;
                    totalamount = total_basket_amount[0].total_amount;
                    purchasedate = total_basket_amount[0].purchase_date;
    
                    console.log(`basketID: "${basketId}", customerID: "${customerid}", total amount: "${totalamount}", purchase date: "${purchasedate}"`);
    
                    // Check loyalty for the customer without checking product
                    event.emit('check-loyalty-customer', customerid);
    
                    // Process each product in the basket
                    total_basket_amount.forEach((item) => {
                        product = item.product;
    
                        // Get prices, specials, and group specials for each product
                        event.emit('get-product-prices', product);
                    });
                } else {
                    console.log('there was no basket information returned from result')
                }
            }
        });
});

//listener for the 'check-loyalty-customer' event
event.on('check-loyalty-customer', (customerId) => {
    console.log('Retrieved the customer id', customerId);
    
    // Call the getCustomerBasketItems method
    Basket.checkLoyaltyCustomer(customerId, (err, customer) => {
        if (err) {
            console.error('Error determining if the customer is on loyalty:', err);
        } else {
            console.log('Customer is on loyalty program:', customer);
            // Further processing of basket items...

            if (customer && customer.length > 0) {
                loyaltytier = customer[0].loyalty_tier;
                console.log(`The customer is on the loyalty tier as a ${loyaltytier}, now checking product prices...`);

                //emit event for basket items using stored variables
                event.emit('get-product-prices', product)
            } else {
                console.log('Unfortunately the customer is not on the loyalty  program, No Discounts can be Applied!')
            }
        }
    });
});

event.on('get-product-prices', (product) => {
    console.log('ALL PRODUCTS', product);
    
    // Call the getCustomerBasketItems method
    Basket.getProductPrices(product, (err, products) => {
        if (err) {
            console.error('Error retrieving the product prices from inventory', err);
        } else {
            console.log('Products Prices have been returned', products);
            // Further processing of basket items...

            if (products && products.length > 0) {
                //assign values from the productsult
                invProductPrice = products[0].selling_incl_1;

                console.log(`Product "${product}" Inventory Stock Price: ${invProductPrice}`)

                //emit event for basket items using stored variables
                //event.emit('get-customer-basket-items', basketid)
                //event.emit('check-loyalty-customer', customerid)
                event.emit('get-product-specials', product) //product retrieved from get total basket
            } else {
                console.log('there was no product prices returned for the product')
            }
        }
    });
});

//listener for the 'get-product-specials' event
event.on('get-product-specials', (product) => {
        console.log(`Retrieving the product specials for "${product}"`);
        
        // Call the getCustomerBasketItems method
        Basket.getProductSpecials(product, (err, productspecials) => {
            if (err) {
                console.error('Error retrieving the Individual Product Specials', err);
            } else {
                console.log('Retrieved the Individual Products Specials:', productspecials);
                // Further processing of basket items...

                if( productspecials && productspecials.length > 0) {
                    specialid = productspecials[0].special_id;
                    //special = productspecials[0].special;
                    specialprice = productspecials[0].special_price;
                    //specialvalue = productspecials[0].special_value;
                    //specialtype = productspecials[0].special_type;
                    //startdate = productspecials[0].start_date;
                    //expirydate = productspecials[0].expiry_date;
                    
                    console.log(`The Individual Product has a special of - Special ID: "${specialid}", Special Price "${specialprice}"`);
                } else {
                    console.log('No product specials found for this item. Checking group specials...');

                    //Emit event for checking group specials if no product specials are found
                    event.emit('get-product-group-specials', product);
                }
            }
        });
});

event.on('get-product-group-specials', (product) => {
    console.log('Checking group specials for product:', product);

    //Call the getProductGroupSpecials method
    Basket.getProductGroupSpecials(product, (err, groupSpecials) => {
        if (err) {
            console.error('Error retrieving group specials:', err);
        } else {
            console.log('Group specials:', groupSpecials);

            if (groupSpecials && groupSpecials.length > 0) {
                specialid = groupSpecials[0].special_id;
                groupspecialid = groupSpecials[0].special_group_id;
                //special = groupSpecial[0].special;
                specialprice = groupSpecials[0].special_price;
                specialvalue = groupSpecials[0].special_value;
                specialtype = groupSpecials[0].special_type;
                //startdate = groupSpecial[0].start_date;
                //expirydate = groupSpecial[0].expiry_date;

                console.log(`The Product is linked to a group special off - Special ID: ${specialid}, Group Special ID: ${groupspecialid}, Product: ${product}, Special Price: ${specialprice}`);
            } else {
                console.log('NO INDIVIDUAL or GROUP SPECIALS HAVE BEEN FOUND FOR THE PRODUCT')
            }
        }
    })
})

//listener for the 'save-clients-transaction' event
event.on('save-clients-transaction', (basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate) => {
        console.log('successfully save-clients-transaction', basketid);
        
        // Call the getCustomerBasketItems method
        Basket.saveClientsTransaction(basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate, (err, client_info) => {
            if (err) {
                console.error('Error saving the information', err);
            } else {
                console.log('saved client information:', client_info);
                // Further processing of basket items...
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

            // Save results to the global variable
            customerBasketPrices = results;
                        
            result(null, results); //send all results to the controller
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
                    rejecct(err);
                } else {
                    console.log(`Item saved successsfully: ${product}`); // log success
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
            }
        });
}

// Basket.getCustomerBasket = (basketId, result) => {
//         // const basketId = req.params.basket_id;
//         console.log('Fetching basket with ID:', basketId); // Add logging to see the basket_id

//         dbConn.query('SELECT basket_id, customer_id, product, total_amount, purchase_date FROM store_loyalty.tblbasketinfo WHERE basket_id = ?', [basketId], (err, res) => {
//             if (err) {
//                 //console.error('Error while getting basket information:', err); // Better error logging
//                 result(err, null);  // Notice the order: return error first
//             } else if (res.length === 0) {
//                 //Console.warn('No data found for basket ID:', basketId); // Log when no data is returned
//                 result(null, { message: 'No basket found with this ID' }); // Return a meaningful message if no data
//             } else {
//                 //console.log('Successfully retrieved basket information:', res);

//                 result(null, res);
//             }
//         });
// };

//basketProducts
Basket.getProductSpecials = (product, result) => {
        dbConn.query(`SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, spi.product_description, spi.special_price FROM store_loyalty.tblspecials sp JOIN store_loyalty.tblspecialitems spi ON sp.special_id = spi.special_id WHERE sp.special_type = 'Special' AND sp.isActive = 1 AND spi.product_description = ? AND sp.start_date <= CURDATE() AND sp.expiry_date >= CURDATE()`, [product], (err, res) => {
            if (err) {
                //console.log('Error while checking the product specials for the purchased item' + err);
                result(null, err);
            } else {
                //console.log('Successfully retrieved the special using the basket infomation', res);
                result(null, res);
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