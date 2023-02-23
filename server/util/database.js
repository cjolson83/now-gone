require("dotenv").config();
// const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize('postgresql://cjolson83:v2_3zBKc_7yjz8xds3TQWCx9VNuCaLBk@db.bit.io:5432/cjolson83/now-gone', {
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
