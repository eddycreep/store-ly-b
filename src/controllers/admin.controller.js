const AdminModel = require('../models/admin.model');

exports.getReviews = (req, res) => {
    AdminModel.getReviews((err, user) => {
        if (err) {
            user.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Success";
            res.send(user);
    })
}
