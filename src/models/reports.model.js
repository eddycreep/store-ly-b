var dbConn = require("../../config/db.config");

var Reports = function (user) {
    this.id = user.id,
    this.name = user.name,
    this.surname = user.surname,
    this.id_number = user.id_number,
    this.mobile_number = user.mobile_number,
    this.age = user.age,
    this.gender = user.gender,
    this.birthday = user.birthday,
    this.ethnicity = user.ethnicity,
    this.employment_status = user.employment_status,
    this.loyalty = user.loyalty,
    this.sign_up_date = user.sign_up_date
};

Reports.getLoyaltyClients = (result) => {
    dbConn.query('SELECT id, name, surname, id_number, mobile_number, age, gender, birthday, ethnicity, employment_status, loyalty, sign_up_date FROM store_loyalty.tblclients WHERE loyalty = 1', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting the loyalty clients:' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Reports.getNonLoyaltyClients = (result) => {
    dbConn.query('SELECT id, name, surname, id_number, mobile_number, age, gender, birthday, ethnicity, employment_status, loyalty, sign_up_date FROM store_loyalty.tblclients WHERE loyalty = 0', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting the non loyalty clients:' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Reports;