require("dotenv").config();
const { REACT_APP_DATABASE_URL } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(REACT_APP_DATABASE_URL, {
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
