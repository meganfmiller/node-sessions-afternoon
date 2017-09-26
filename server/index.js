var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var checkForSession = require(`${__dirname}/middlewares/checkForSession`);
var swagController = require(`${__dirname}/controllers/swag_controller`);
var authController = require(`${__dirname}/controllers/auth_controller`);
var cartController = require('./controllers/cart_controller');
var searchController = require('./controllers/search_controller');

var app = express();

app.use(bodyParser.json());
app.use(session({
    secret: "aweoivw3t3osvswoeiusdj",
    resave: false,
    saveUninitialized: false
}));

app.use(checkForSession);

app.use(express.static(`${__dirname}/../public/build`));


app.get('/api/swag', swagController.read);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

app.post('/api/cart', cartController.add);
app.delete('/api/cart', cartController.delete);
app.post('/api/cart/checkout', cartController.checkout);

app.get('/api/search', searchController.search);

const port = 3000;

app.listen(port, function () {
    console.log(`Server is listening on port ${port}`)
})
