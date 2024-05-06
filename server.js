const { config } = require('dotenv');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./controllers/index.js');
app.use(routes);

const sequelize = require('./config/connection.js');
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
