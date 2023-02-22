const { Place } = require("../models/place");
const { PlaceType } = require("../models/placeType");
const { Photo } = require("../models/photo");

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
        photoURL,
        yearTaken,
        photoCaption,
      } = req.body;
      const newPlace = await Place.create({
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
      await Photo.create({
        photoURL,
        yearTaken,
        photoCaption,
        placeId: newPlace.id,
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
      const place = await Place.findOne({ where: {id},
      include: [{
        model:Photo
      }] });
      res.status(200).send(place);
    } catch (error) {
      console.log("ERROR IN getPlaceTypes");
      console.log(error);
      res.sendStatus(400);
    }
  },

};
