var dbConn = require("../../config/db.config");

var User = function (user) {
    this.emp_id = user.emp_id;
    this.emp_name = user.emp_name;
    this.action = user.action;
    this.date_time = user.date_time;
};

User.InsertAuditLog = (req, result) => {
    dbConn.query('INSERT INTO audit_log SET ?', req.body, (err, res) => {
        if (!(err === null)) {
            console.log('Error while inserting data: ' + err);
            result(null, err);
            // dbConn.end();
        } else {
            result(null, res);
            // dbConn.end();
        }
    })
}

User.addNewMember = (req, result) => {
    const { emp_name, emp_surname, id_no, phone_number, email_address, role } = req.body;
    dbConn.query('INSERT INTO store_loyalty.user(emp_name, emp_surname, id_no, phone_number, email_address, role) VALUES(?, ?, ?, ?, ?, ?, ?)', [emp_name, emp_surname, id_no, phone_number, email_address, role], (err, res) => {
        if (!(err === null)) {
            console.log('Error while inserting data new sign-up member: ' + err);
            result(null, err);
            // dbConn.end();
        } else {
            result(null, res);
            // dbConn.end();
        }
    })
}

module.exports = User;

