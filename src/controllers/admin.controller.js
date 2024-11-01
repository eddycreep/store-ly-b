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

//save specials
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

//update specials
exports.updateSpecial = (req, res) => {
    AdminModel.updateSpecial(req, (err, special) => {
    if (err) {
        special.message = "Update Special - Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Update Special - Success";
        res.send(special);
    })
}


exports.updateSpecialItem = (req, res) => {
    AdminModel.updateSpecialItem(req, (err, special) => {
    if (err) {
        special.message = "Update Special Item - Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Update Special Item - Success";
        res.send(special);
    })
}

exports.updateCombinedSpecialItems = (req, res) => {
    AdminModel.updateCombinedSpecialItems(req, (err, special) => {
    if (err) {
        special.message = "Update Combined Special Items - Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Update Combined Special Items - Success";
        res.send(special);
    })
}

//delete specials
exports.deleteSpecial = (req, res) => {
    AdminModel.deleteSpecial(req, (err, special) => {
    if (err) {
        special.message = "Deleting Special - Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Deleting Special - Success";
        res.send(special);
    })
}

exports.deleteSpecialItem = (req, res) => {
    AdminModel.deleteSpecialItem(req, (err, special) => {
    if (err) {
        special.message = "Deleting Special Item- Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Deleting Special Item- Success";
        res.send(special);
    })
}

exports.deleteCombinedSpecialItems = (req, res) => {
    AdminModel.deleteCombinedSpecialItems(req, (err, special) => {
    if (err) {
        special.message = "Deleting Combined Product Special - Failed";
        res.send(err);
        process.exit(1);
    }
        special.message = "Deleting Combined Product Special - Success";
        res.send(special);
    })
}

//rewards
exports.getAllRewards = (req, res) => {
    AdminModel.getAllRewards((err, employee) => {
    if (err) {
        employee.message = "Fetching All Rewards - Failed";
        res.send(err);
        process.exit(1);
    }
        employee.message = "Fetching All Rewards - Success";
        res.send(employee);
    })
}


exports.saveReward = (req, res) => {
    AdminModel.saveReward(req, (err, employee) => {
    if (err) {
        employee.message = "Adding Alternative Reward - Failed";
        res.send(err);
        process.exit(1);
    }
        employee.message = "Adding Alternative Reward - Success";
        res.send(employee);
    })
}

exports.updateReward = (req, res) => {
    AdminModel.updateReward(req, (err, employee) => {
    if (err) {
        employee.message = "Update Alternative Reward - Failed";
        res.send(err);
        process.exit(1);
    }
        employee.message = "Update Alternative Reward - Success";
        res.send(employee);
    })
}

exports.deleteReward = (req, res) => {
    AdminModel.deleteReward(req, (err, employee) => {
    if (err) {
        employee.message = "Removing Alternative Reward - Failed";
        res.send(err);
        process.exit(1);
    }
        employee.message = "Removing Alternative Reward - Success";
        res.send(employee);
    })
}

exports.getAllSurveys = (req, res) => {
    AdminModel.getAllSurveys((err, user) => {
        if (err) {
            user.message = "Fetching All Surveys - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Fetching All Surveys - Success";
            res.send(user);
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

exports.deleteSurvey = (req, res) => {
    AdminModel.deleteSurvey(req, (err, user) => {
        if (err) {
            user.message = "Deleting Survey - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Deleting Survey - Success";
            res.send(user);
    })
}

exports.getActiveSurveys = (req, res) => {
    AdminModel.getActiveSurveys((err, user) => {
        if (err) {
            user.message = "Fetching Active Surveys - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Fetching Active Surveys - Success";
            res.send(user);
    })
}

exports.getAllSurveys = (req, res) => {
    AdminModel.getAllSurveys((err, user) => {
        if (err) {
            user.message = "Fetching All Surveys - Failed";
            res.send(err);
            process.exit(1);
        }
            user.message = "Fetching All Surveys - Success";
            res.send(user);
    })
}