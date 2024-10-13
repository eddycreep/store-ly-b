var dbConn = require("../../config/db.config");

var Admin = function (user) {
    this.id = user.id,
    this.client_name = user.client_name,
    this.client_image = user.client_image,
    this.product = user.product,
    this.rating = user.rating,
    this.date = user.date,
    this.comment = user.comment
};

Admin.getReviews = (result) => {
    dbConn.query('SELECT id, client_name, client_image, product, rating, date, comment FROM store_loyalty.tblproductreviews', (err, res) => {
        if (!(err === null)) {
            console.log('Error while getting customer product reviews' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Admin;