require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./util/database");

const { Comment } = require("./models/comment");
const { Photo } = require("./models/photo");
const { PlaceType } = require("./models/placeType");
const { Place } = require("./models/place");
const { User } = require("./models/user");
const { register, login } = require("./controllers/authControl");
const {
  addPlace,
  getAllPlaceTypes,
  getAllPlaces,
  getPlace,
  comment,
  getComments
} = require("./controllers/placeControl");
const { seedDatabase } = require("./util/seed");

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Place);
Place.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Place.hasMany(Comment);
Comment.belongsTo(Place);

Place.hasMany(Photo);
Photo.belongsTo(Place);

PlaceType.hasMany(Place);
Place.belongsTo(PlaceType);

app.post("/api/register", register);
app.post("/api/login", login);

app.get("/api/places", getAllPlaces);
app.get("/api/places/:id", getPlace);
app.post("/api/places", addPlace);

app.get("/api/types", getAllPlaceTypes);

app.post("/api/comments", comment);
app.get("/api/comments/:id", getComments)

sequelize
  // .sync({force: true}).then(()=> seedDatabase())
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`));
  })
  .catch((err) => console.log(err));
