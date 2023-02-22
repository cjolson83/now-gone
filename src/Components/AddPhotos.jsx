import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const AddPhotos = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [yearTaken, setYearTaken] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");

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
            label="Photo Caption"
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
        <Fab size="medium" color="#424949" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddPhotos;
