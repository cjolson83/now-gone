const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  PlaceType: sequelize.define("place_type", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    typeName: DataTypes.STRING,
  }),
};
