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
      console.log("No customer found, exiting the process");
      res.status(404).json({ message: "Customer not found" });
      process.exit(1) // Exit the process if no customer is found
    } else {
      res.send(customer);
    }
  });
};


// exports.getCustomerBasket = (req, res) => {
//   BasketModel.getCustomerBasket(req, (err, basket) => {
//     if (err) {
//       res.status(500).json({ error: err });
//       return;
//     }
//     //res.status(200).json
//     res.send(basket);
//   });
// };

exports.getProductSpecials = (req, res) => {
  BasketModel.getProductSpecials(req, (err, basket) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    //res.status(200).json
    res.send(basket);
  });
};

exports.getProductCombinedSpecials = (req, res) => {
  BasketModel.getProductCombinedSpecials(req, (err, basket) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    //res.status(200).json
    res.send(basket);
  });
};

exports.saveBasketInfoItems = (req, res) => {
  BasketModel.saveBasketInfoItems(req, (err, client) => {
    if (err) {
      client.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    client.message = "Success";
    res.send(client);
  })
}

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