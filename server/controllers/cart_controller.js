var swag = require(`${__dirname}/../models/swag`);

module.exports = {
    add: (req, res, next) => {
        const index = req.session.user.cart.findIndex(swag => swag.id == req.query.id);
        const selectedSwag = swag.find(swag => swag.id == req.query.id);

        if(index === -1) {
            req.session.user.cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    },
    delete: (req, res, next) => {
        const selectedSwag = req.session.user.cart.find(swag => swag.id == req.query.id);

        if(selectedSwag) {
            const i = req.session.user.cart.findIndex(swag => swag.id == req.query.id);
            req.session.user.cart.splice(i,1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        
        res.status(200).send(req.session.user);
    }
}