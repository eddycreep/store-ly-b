const ProductsModel = require('../models/products.model');

exports.getProducts = (req, res) => {
  ProductsModel.getProducts((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.setSpecial = (req, res) => {
  ProductsModel.setSpecial(req, (err, user) => {
    if (err) {
      user.message = "Set Special- Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Set Special - Success";
    res.send(user);
  })
}

exports.setProductSpecial = (req, res) => {
  ProductsModel.setProductSpecial(req, (err, user) => {
    if (err) {
      user.message = "Add Product - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Add Product - Success";
    res.send(user);
  })
}

exports.getProductSpecials = (req, res) => {
  ProductsModel.getProductSpecials((err, user) => {
    if (err) {
      user.message = "Get Active Product Specials - Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Get Active Product Specials - Success";
    res.send(user);
  })
}

exports.getUpcomingProductSpecials = (req, res) => {
  ProductsModel.getUpcomingProductSpecials((err, specials) => {
    if (err) {
      specials.message = "Get Upcoming Product Specials - Failed";
      res.send(err);
      process.exit(1);
    }
    specials.message = "Get Upcoming Product Specials - Success";
    res.send(specials);
  })
}

exports.getActiveGroupSpecials = (req, res) => {
  ProductsModel.getActiveGroupSpecials((err, specials) => {
    if (err) {
      specials.message = "Get Active Group Specials - Failed";
      res.send(err);
      process.exit(1);
    }
    specials.message = "Get Active Group Specials - Success";
    res.send(specials);
  })
}

exports.getUpcomingGroupSpecials = (req, res) => {
  ProductsModel.getUpcomingGroupSpecials((err, specials) => {
    if (err) {
      specials.message = "Get Upcoming Group Specials - Failed";
      res.send(err);
      process.exit(1);
    }
    specials.message = "Get Upcoming Group Specials - Success";
    res.send(specials);
  })
}

exports.getAllProductSpecials = (req, res) => {
  ProductsModel.getAllProductSpecials((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}


exports.getAllCombinedSpecials = (req, res) => {
  ProductsModel.getAllCombinedSpecials((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}

exports.getActiveRewards = (req, res) => {
  ProductsModel.getActiveRewards((err, employee) => {
    if (err) {
      employee.message = "Fetching Active Rewards - Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Fetching Active Rewards - Success";
    res.send(employee);
  })
}

exports.getActiveSurveys = (req, res) => {
  ProductsModel.getActiveSurveys((err, user) => {
      if (err) {
          user.message = "Fetching Active Surveys - Failed";
          res.send(err);
          process.exit(1);
      }
          user.message = "Fetching Active Surveys - Success";
          res.send(user);
  })
}