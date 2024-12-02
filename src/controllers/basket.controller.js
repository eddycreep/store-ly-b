const BasketModel = require('../models/basket.model');

exports.saveCustomerBasket = (req, res) => {
  BasketModel.saveCustomerBasket(req, (err, special) => {
  if (err) {
      special.message = "Save Customer Basket - Failed";
      res.send(err);
      process.exit(1);
  }
      special.message = "Save Customer Basket - Success";
      res.send(special);
  })
}

exports.getProductPrices = (req, res) => {
  const productDescriptions = req.params.product_description.split(','); // Accept multiple products as a comma-separated string

  BasketModel.getProductPrices(productDescriptions, (err, prices) => {
      if (err) {
          console.error("Error fetching product prices:", err);
          return res.status(500).send({ message: "Failed to fetch product prices", error: err });
      }

      res.status(200).send({
          message: "Product prices retrieved successfully",
          data: prices,
      });
  });
};

exports.saveCustomerBasketItems = (req, res) => {
  BasketModel.saveCustomerBasketItems(req, (err, special) => {
      if (err) {
          console.error("Save Customer Basket Items - Failed:", err);
          return res.status(500).send({ message: "Failed to save basket items", error: err });
      }

      res.status(200).send({
          message: "Save Customer Basket Items - Success",
          data: special,
      });
  });
};

exports.checkLoyaltyCustomer = (req, res) => {
  BasketModel.checkLoyaltyCustomer(req, (err, customer) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }

    if (!customer || customer.length === 0) {
      console.log("THE CUSTOMER WAS NOT FOUND IN THE LOYALTY SYSTEM");
      res.status(404).json({ message: "Customer not found" });
      process.exit(1) // Exit the process if no customer is found

    } else {
      res.send(customer);
    }
  });
};

exports.getProductSpecials = (req, res) => {
  const productDescriptions = req.params.product_description.split(','); // Accept multiple products as a comma-separated string

  BasketModel.getProductSpecials(productDescriptions, (err, specials) => {
      if (err) {
          console.error("Error fetching product specials:", err);
          return res.status(500).send({ message: "Failed to fetch product specials", error: err });
      }

      res.status(200).send({
          message: "Product specials retrieved successfully",
          data: specials,
      });
  });
};

// Controller function for combined specials
exports.getProductCombinedSpecials = (req, res) => {
  const { products } = req.body; // Expect products in the request body as an array

  BasketModel.getProductCombinedSpecials(products, (err, combinedSpecials) => {
    if (err) {
      console.error("Error fetching combined specials:", err);
      return res.status(500).send({
        message: "Failed to fetch combined specials",
        error: err,
      });
    }

    res.status(200).send({
      message: "Combined specials retrieved successfully",
      data: combinedSpecials,
    });
  });
};


exports.saveFinalTransaction = (req, res) => {
  BasketModel.saveFinalTransaction(req, (err, client) => {
    if (err) {
      client.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    client.message = "Success";
    res.send(client);
  })
}


// exports.addTierReward = (req, res) => {
//   BasketModel.addTierReward(req, (err, client) => {
//     if (err) {
//       client.message = "Add Tier Reward - Failed";
//       res.send(err);
//       process.exit(1);
//     }
//     client.message = "Add Tier Reward - Success";
//     res.send(client);
//   })
// }


// exports.editTierReward = (req, res) => {
//   BasketModel.saveFinalTransaction(req, (err, client) => {
//     if (err) {
//       client.message = "Edit Tier Reward - Failed";
//       res.send(err);
//       process.exit(1);
//     }
//     client.message = "Edit Tier Reward - Success";
//     res.send(client);
//   })
// }


// exports.deleteTierReward = (req, res) => {
//   BasketModel.saveFinalTransaction(req, (err, client) => {
//     if (err) {
//       client.message = "Delete Tier Reward - Failed";
//       res.send(err);
//       process.exit(1);
//     }
//     client.message = "Delete Tier Reward - Success";
//     res.send(client);
//   })
// }