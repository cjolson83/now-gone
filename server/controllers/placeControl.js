const { Place } = require("../models/place");
const { PlaceType } = require("../models/placeType");

module.exports = {
  addPlace: async (req, res) => {
    try {
      const {
        userId,
        placeName,
        selectedPlaceType,
        location,
        dateOpen,
        dateClose,
        buildingStands,
        thereNow,
        description,
      } = req.body;
      await Place.create({
        userId,
        placeName,
        placeTypeId: selectedPlaceType,
        location,
        dateOpen,
        dateClose,
        buildingStands,
        thereNow,
        description,
      });
      console.log("add post");
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN addPlace");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getAllPlaceTypes: async (req, res) => {
    try {
      const allPlaceTypes = await PlaceType.findAll();
      res.status(200).send(allPlaceTypes);
    } catch (error) {
      console.log("ERROR IN getPlaceTypes");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getAllPlaces: async (req, res) => {
    try {
      const allPlaces = await Place.findAll();
      res.status(200).send(allPlaces);
    } catch (error) {
      console.log("ERROR IN getPlaceTypes");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getPlace: async (req, res) => {
    try {
      const { id } = req.params;
      const place = await Place.findOne({ where: { id } });
      res.status(200).send(place);
    } catch (error) {
      console.log("ERROR IN getPlaceTypes");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
