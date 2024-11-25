const UserModel = require('../models/user.model');

exports.InsertAuditLog = (req, res) => {
    UserModel.InsertAuditLog(req, (err, employee) => {
      if (err) {
        employee.message = "Failed";
        res.send(err);
        process.exit(1);
      }
      employee.message = "Success";
      res.send(employee);
    })
}


exports.addNewMember = (req, res) => {
    UserModel.addNewMember(req, (err, employee) => {
      if (err) {
        employee.message = "Add New Member - Failed";
        res.send(err);
        process.exit(1);
      }
      employee.message = "Add New Member - Success";
      res.send(employee);
    })
}