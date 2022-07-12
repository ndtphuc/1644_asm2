require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const toyController = require('./controller/toyController');
const supplierController = require('./controller/supplierController');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.get('/', function (req, res) {
    res.redirect('toy/list');
})

app.get('/', function (req, res) {
    res.redirect('supplier/list');
})

app.set('view engine', 'hbs');toyController

app.set('view engine', 'hbs');supplierController

app.use(express.static(path.join(__dirname+ '/public')))
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})

app.use('/toy', toyController);

app.use('/supplier', supplierController);