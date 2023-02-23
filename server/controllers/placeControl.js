const { Place } = require("../models/place");
const { PlaceType } = require("../models/placeType");
const { Photo } = require("../models/photo");
const { Comment } = require("../models/comment");

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
  deletePlace: async (req, res) => {
    try {
      const { id } = req.params;
      await Place.destroy({
        where: { id },
      });
      console.log("delete place");
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN deletePlace");
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
      const allPlaces = await Place.findAll({
        include: [
          {
            model: Photo,
          },
        ],
      });
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
      const place = await Place.findOne({
        where: { id },
        include: [
          {
            model: Photo,
          },
        ],
      });
      res.status(200).send(place);
    } catch (error) {
      console.log("ERROR IN getPlaceTypes");
      console.log(error);
      res.sendStatus(400);
    }
  },
  comment: async (req, res) => {
    try {
      const { userId, placeId, comment } = req.body;
      await Comment.create({
        userId,
        placeId,
        comment,
      });
      console.log("add comment");
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN addComment");
      console.log(error);
      res.sendStatus(400);
    }
  },
  getComments: async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await Comment.findAll({ where: { placeId: id } });
      res.status(200).send(comments);
    } catch (error) {
      console.log("ERROR IN getComments");
      console.log(error);
      res.sendStatus(400);
    }
  },
  addPhoto: async (req, res) => {
    try {
      const { userId, placeId, photoURL, yearTaken, photoCaption } = req.body;
      await Photo.create({
        userId,
        placeId,
        photoURL,
        yearTaken,
        photoCaption,
      });
      console.log("add photo");
      res.sendStatus(200);
    } catch (error) {
      console.log("ERROR IN addphoto");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
