import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AuthContext from "../store/AuthContext";
import axios from "axios";

const AddPhotos = ({ place }) => {
  const [photoURL, setPhotoURL] = useState("");
  const [yearTaken, setYearTaken] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const { token, userId } = useContext(AuthContext);
  const placeId = place.id;
  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/photos",
        {
          placeId,
          userId,
          photoURL,
          yearTaken,
          photoCaption,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        refreshPage();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
    <p className="photoadd">Add a Photo</p>
    <div className="addphotoform">
      <TextField
        className="photo_url"
        label="Photo URL"
        variant="outlined"
        sx={{ mb: "15px" }}
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <div className="lowerphotodiv">
      <TextField
        className="photocaption"
        label="Photo Caption / Credit"
        sx={{ mb: "15px" }}
        variant="outlined"
        value={photoCaption}
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
      <TextField
        className="year_taken"
        sx={{ mb: "15px" }}
        label="Photo Year"
        variant="outlined"
        value={yearTaken}
        onChange={(e) => setYearTaken(e.target.value)}
      />
      <div>
      <Fab
        size="medium"
        aria-label="add"
        style={{
          backgroundColor: "#424949",
          color: "antiquewhite",
        }}
        onClick={handleSubmit}
      >
        <AddPhotoAlternateIcon />
      </Fab>
      </div>
      </div>
    </div>
    </div>
  );
};

export default AddPhotos;
