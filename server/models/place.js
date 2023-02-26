const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Place: sequelize.define("place", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    placeName: DataTypes.STRING,
    location: DataTypes.STRING,
    dateOpen: DataTypes.DATEONLY,
    dateClose: DataTypes.DATEONLY,
    buildingStands: DataTypes.BOOLEAN,
    thereNow: DataTypes.STRING,
    description: DataTypes.TEXT,
  }),
};
