var swag = require(`${__dirname}/../models/swag`);

module.exports = {
    read: function(req,res,next) {
        res.status(200).send(swag)
    }
}