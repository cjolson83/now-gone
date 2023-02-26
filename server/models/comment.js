const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Comment: sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comment: DataTypes.STRING(1000),
  }),
};
