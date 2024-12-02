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
    Basket.getProductPrices(products, (err, prices) => {
        // if (err) {
        //     console.error("Error fetching product prices: ", err);
        // } else {
        //     console.log("PRODUCT PRICES: ", prices);
        // }
    });
});

// Event listener for saveCustomerBasketItems
event.on('save-customer-basket-items', () => {
    //console.log("Triggering saveCustomerBasketItems event listener...");

    Basket.saveCustomerBasketItems((err, res) => {
        event.emit('check-loyalty-customer'); // Trigger the next step
    });
});

// Event listener for triggering checkLoyaltyCustomer
event.on('check-loyalty-customer', () => {
    //console.log("Triggering checkLoyaltyCustomer event listener...");

    Basket.checkLoyaltyCustomer(customerid, (err, res) => {
    });
});

// Event listener to trigger getProductSpecials
event.on('get-product-specials', (product) => {
    Basket.getProductSpecials(product, (err, specials) => {
    });
});

// Event listener to trigger getProductCombinedSpecials
event.on('get-product-combined-specials', (product) => {
    Basket.getProductCombinedSpecials(product, (err, combinedSpecials) => {
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
    //console.log('Products in Basket', basketProducts); 

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
                    resolve({ product, selling_incl_1: 0.0000, special_price_incl: '0.0000' });

                } else {
                    const priceData = res[0];

                    // Validate that description (product name) is not null or undefined
                    const resolvedProduct = priceData.description || 'Unknown Product';

                    // Log the resolved object to the console
                    console.log({
                        product: resolvedProduct,
                        selling_incl_1: parseFloat(priceData.selling_incl_1),
                        special_price_incl: priceData.special_price_incl || '0.0000',
                    });

                    resolve({
                        product: resolvedProduct,
                        selling_incl_1: parseFloat(priceData.selling_incl_1),
                        special_price_incl: priceData.special_price_incl || '0.0000',
                    });
                }
            })
        })
    })

    Promise.all(queries)
        .then((results) => {
            //console.log('Product prices retrieved successfully:', results)

            customerBasketPrices = results; // Save results to the global variable
            result(null, results); //send all results to the controller

            // Emit event to trigger saveCustomerBasketItems
            event.emit('save-customer-basket-items');
            console.log('now saving customers basket items');
        })
        .catch((err) => {
            //console.error('Error fetching product prices:', err);
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
                    console.log(`Items saved successsfully: ${product}`); // log success
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
}

Basket.checkLoyaltyCustomer = (customerId, result) => {
    //console.log("Checking loyalty for customer with ID:", customerId);
    const customerID = customerid

        dbConn.query('SELECT CustomerID, LoyaltyTier FROM store_loyalty.tblloyaltycustomers WHERE CustomerID = ?', [customerID], (err, res) => {
            if (err) {
                //console.log('Error while checking if the customer is apart of the loyalty program' + err);
                result(null, err);

            } else if (res.length === 0) {
                //console.log('CUSTOMER IS NOT IN THE LOYALTY SYSTEM: ');
                result(null, null);  // No customer found

            } else {
                //console.log('CUSTOMER FOUND IN LOYALTY SYSTEM: ', res);
                result(null, res);

                // Trigger getProductCombinedSpecials regardless of specials result
                event.emit('get-product-specials', basketProducts);
            }
        });
}

//basketProducts
Basket.getProductSpecials = (products, result) => {
    //console.log("Products for Special Check:", basketProducts);

    if (!Array.isArray(basketProducts) || basketProducts.length === 0) {
        return result({ message: "No products provided in the basket" }, null);
    }

    const query = `
            SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, 
            sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, 
        spcg.special_group_id, spcg.product_description, spcg.special_price 
        FROM store_loyalty.tblspecials sp
        JOIN store_loyalty.tblspecials_combinedgroup spcg 
        ON sp.special_id = spcg.special_id
        WHERE sp.special_type = 'Combined Special' 
        AND sp.isActive = 1 
        AND spcg.product_description = 'SWITCH 440ML'
        AND sp.start_date <= CURDATE() 
        AND sp.expiry_date >= CURDATE()
    `;

    const queries = products.map((product) => {
        return new Promise((resolve, reject) => {
            dbConn.query(query, [product], (err, res) => {
                if (err) {
                    //console.error(`Error fetching specials for product: ${product}`, err);
                    reject(err);
                } else if (res.length === 0) {
                    //console.log(`No specials found for product: ${product}`);
                    resolve({ product, message: "no special assigned" });
                } else {
                    resolve({ product, specials: res, message: "item is on special" });
                }
            });
        });
    });

    Promise.all(queries)
    .then((results) => {
        console.log(
            "Returned Individual Product Specials: ",
            JSON.stringify(results, null, 2) // Pretty-print the JSON
        );

        event.emit("get-product-combined-specials", results);
        result(null, results); // Send formatted results to the controller
    })
    .catch((err) => {
        console.error("Error fetching normal product specials:", err);
        result(err, null);
    });

};


// Function to get combined specials
Basket.getProductCombinedSpecials = (products, result) => {
    if (!Array.isArray(products) || products.length === 0) {
      console.log("No products provided in the request.");
      return result({ message: "No products provided" }, null);
    }
  
    // Fetch all active combined specials
    const query = `
    SELECT sp.special_id, sp.special_name, sp.special, sp.special_type, sp.store_id, 
            sp.start_date, sp.expiry_date, sp.special_value, sp.isActive, 
           spcg.special_group_id, spcg.product_description, spcg.special_price 
    FROM store_loyalty.tblspecials sp
    JOIN store_loyalty.tblspecials_combinedgroup spcg 
      ON sp.special_id = spcg.special_id
    WHERE sp.special_type = 'Combined Special' 
      AND sp.isActive = 1 
	  AND spcg.product_description = ?
      AND sp.start_date <= CURDATE() 
      AND sp.expiry_date >= CURDATE()
  `;
  
    dbConn.query(query, (err, allSpecials) => {
      if (err) {
        console.error("Error fetching combined specials:", err);
        return result(err, null);
      }
  
      if (allSpecials.length === 0) {
        console.log("No active combined specials found in the database.");
        return result(null, []);
      }
  
      // Debug log: fetched specials
      console.log("Returned Combined Product Specials: ", allSpecials);
  
      const groupTracker = {};
  
      // Track required groups for each special
      allSpecials.forEach((special) => {
        if (!groupTracker[special.special_id]) {
          groupTracker[special.special_id] = {
            specialName: special.special_name,
            groups: {},
          };
        }
        groupTracker[special.special_id].groups[special.special_group_id] =
          false; // Initialize each group as not fulfilled
      });
  
      // Check purchased products against combined specials
      products.forEach((product) => {
        allSpecials.forEach((special) => {
          if (product === special.product_description) {
            groupTracker[special.special_id].groups[special.special_group_id] = true; // Mark group as fulfilled
          }
        });
      });
  
      // Identify fully matched specials
      const matchedSpecials = Object.entries(groupTracker)
        .filter(([_, data]) => Object.values(data.groups).every(Boolean)) // Ensure all group IDs are true
        .map(([specialId, data]) => ({
          specialId,
          specialName: data.specialName,
        }));
  
      // Debug log: matched specials
    //   if (matchedSpecials.length === 0) {
    //     console.log("No combined specials matched for the purchased products.");
    //     return result(null, []);
    //   }
  
      //console.log("Matched Combined Specials:", matchedSpecials);
      result(null, matchedSpecials);
    });
};


Basket.saveFinalTransaction = (basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate, result) => {
        dbConn.query('INSERT INTO store_loyalty.tblcompletetransaction (basket_id, customer_id, purchased_product, quantity, product_amount, product_discounted_amount, total_basket_amount, total_disc_basket_amount, payment_method, purchase_date)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate], (err, res) => {
            if (err) {
                //console.log('Error while checking the product specials for the purchased item' + err);
                result(null, err);
            } else {
                //console.log('Successfully retrieved the special using the basket infomation', res);
                result(null, res);
            }
        });
}


module.exports = Basket;


// Basket.addTierReward = () => {
//     const { loyalty_tier, eligibility, rewards, discounts, min_spending_amount, max_spending_amount } = req.body
//         dbConn.query('INSERT INTO store_loyalty.tblcustomertiers(loyalty_tier, eligibility, rewards, discounts, min_spending_amount, max_spending_amount)VALUES(?, ?, ?, ?, ?, ?)', [loyalty_tier, eligibility, rewards, discounts, min_spending_amount, max_spending_amount], (err, res) => {
//             if (err) {
//                 //console.log('Error while checking the product specials for the purchased item' + err);
//                 result(null, err);
//             } else {
//                 //console.log('Successfully retrieved the special using the basket infomation', res);
//                 result(null, res);
//             }
//         });
// }


// Basket.editTierReward = () => {
//         dbConn.query('UPDATE store_loyalty.tblcustomertiers SET loyalty_tier = ?, eligibility = ?, rewards = ?, discounts = ?, min_spending_amount = ?, max_spending_amount = ? WHERE uid =  ?', [basketid, customerid, product, quantity, sellingPrice, newDiscountedPrice, totalamount, newTotalDiscBasketAmount, purchasedate], (err, res) => {
//             if (err) {
//                 //console.log('Error while checking the product specials for the purchased item' + err);
//                 result(null, err);
//             } else {
//                 //console.log('Successfully retrieved the special using the basket infomation', res);
//                 result(null, res);
//             }
//         });
// }


// Basket.deleteTierReward = () => {
//         dbConn.query('DELETE FROM store_loyalty.tblcustomertiers WHERE uid =  ?', [req.params.uid], (err, res) => {
//             if (err) {
//                 //console.log('Error while checking the product specials for the purchased item' + err);
//                 result(null, err);
//             } else {
//                 //console.log('Successfully retrieved the special using the basket infomation', res);
//                 result(null, res);
//             }
//         });
// }

// // event.emit('get-customer-basket', 16)


// module.exports = Basket;