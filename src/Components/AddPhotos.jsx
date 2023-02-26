import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AuthContext from "../store/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPhotos = ({ place }) => {
  const [photoURL, setPhotoURL] = useState("");
  const [yearTaken, setYearTaken] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const { token, userId } = useContext(AuthContext);
  const placeId = place.id;
  const navigate = useNavigate();

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
        navigate(`/places/${place.id}`)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addphotoform">
      <FormControl sx={{ width: "40%" }}>
        <TextField
          id="photo_url"
          label="Photo URL"
          variant="outlined"
          helperText="Add a photo to the collection"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ width: "30%" }}>
        <TextField
          id="photo_caption"
          label="Photo Caption / Credit"
          variant="outlined"
          value={photoCaption}
          onChange={(e) => setPhotoCaption(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ width: "15%" }}>
        <TextField
          id="year_taken"
          label="Photo Year"
          variant="outlined"
          value={yearTaken}
          onChange={(e) => setYearTaken(e.target.value)}
        />
      </FormControl>
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
  );
};

export default AddPhotos;
