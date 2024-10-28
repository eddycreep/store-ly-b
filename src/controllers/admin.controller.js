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

exports.saveSpecial = (req, res) => {
    AdminModel.saveSpecial(req, (err, special) => {
        if (err) {
            special.message = "Saving Special- Failed";
            res.send(err);
            process.exit(1);
        }
            special.message = "Saving Special - Success";
            res.send(special);
    })
}

exports.getSpecialID = (req, res) => {
    AdminModel.getSpecialID(req, (err, special) => {
        if (err) {
            special.message = "Failed";
            res.send(err);
            process.exit(1);
        }
            special.message = "Success";
            res.send(special);
    })
}

exports.saveProductSpecial = (req, res) => {
    AdminModel.saveProductSpecial(req, (err, special) => {
        if (err) {
            special.message = "Saving Product Special - Failed";
            res.send(err);
            process.exit(1);
        }
            special.message = "Saving Product Special- Success";
            res.send(special);
    })
}

exports.saveCombinedSpecial = (req, res) => {
    AdminModel.saveCombinedSpecial(req, (err, special) => {
      if (err) {
        special.message = "Saving Combined Special - Failed";
        res.send(err);
        process.exit(1);
      }
        special.message = "Saving Combined Special - Success";
        res.send(special);
    })
}

exports.saveSurvey = (req, res) => {
    AdminModel.saveSurvey(req, (err, user) => {
        if (err) {
            user.message = "Saving Survey- Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Saving Survey - Success";
            res.send(user);
    })
}

exports.getSurveyID = (req, res) => {
    AdminModel.getSurveyID(req, (err, special) => {
        if (err) {
            special.message = "Fetching Survey ID - Failed";
            res.send(err);
            process.exit(1);
        }
            special.message = "Fetching Survey ID - Success";
            res.send(special);
    })
}

exports.saveSurveyQuestions = (req, res) => {
    AdminModel.saveSurveyQuestions(req, (err, user) => {
        if (err) {
            user.message = "Saving Survey- Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Saving Survey - Success";
            res.send(user);
    })
}