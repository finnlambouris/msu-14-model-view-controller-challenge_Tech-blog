const { config } = require('dotenv');
const path = require('path');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const expressHandlebars = require("express-handlebars");
const handlebars = expressHandlebars.create({});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

const routes = require('./controllers/index.js');
app.use(routes);

const sequelize = require('./config/connection.js');
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}!`));
});
