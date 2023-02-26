require("dotenv").config();
const { REACT_APP_CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(REACT_APP_CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
};
