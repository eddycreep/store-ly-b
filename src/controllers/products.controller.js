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

exports.getSpecialId = (req, res) => {
  ProductsModel.getSpecialId(req, (err, special) => {
    if (err) {
      special.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    special.message = "Success";
    res.send(special);
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


exports.updateGroupSpecial = (req, res) => {
  ProductsModel.updateGroupSpecial(req, (err, special) => {
    if (err) {
      special.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    special.message = "Success";
    res.send(special);
  })
}


exports.updateGroupSpecialProduct = (req, res) => {
  ProductsModel.updateGroupSpecialProduct(req, (err, special) => {
    if (err) {
      special.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    special.message = "Success";
    res.send(special);
  })
}

exports.setProductGroupSpecial = (req, res) => {
  ProductsModel.setProductGroupSpecial(req, (err, employee) => {
    if (err) {
      employee.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    employee.message = "Success";
    res.send(employee);
  })
}

exports.getAllGroupSpecials = (req, res) => {
  ProductsModel.getAllGroupSpecials((err, user) => {
    if (err) {
      user.message = "Failed";
      res.send(err);
      process.exit(1);
    }
    user.message = "Success";
    res.send(user);
  })
}