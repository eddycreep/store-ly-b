const ReportsModel = require('../models/reports.model');

exports.getLoyaltyClients = (req, res) => {
    ReportsModel.getLoyaltyClients((err, user) => {
        if (err) {
            user.message = "Get Loyalty Clients - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Get Loyalty Clients - Success";
            res.send(user);
    })
}

exports.getNonLoyaltyClients = (req, res) => {
    ReportsModel.getNonLoyaltyClients((err, user) => {
        if (err) {
            user.message = "Get Non Loyalty Clients - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Get Non Loyalty Clients - Success";
            res.send(user);
    })
}