import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FormControl } from "@mui/material";

const AddPhotos = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [yearTaken, setYearTaken] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");

  return (
    <Stack component="form" noValidate spacing={3}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          id="photo_url"
          label="Photo URL"
          variant="outlined"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </FormControl>
      <div className="photoinput">
        <FormControl sx={{ width: "70%" }}>
          <TextField
            id="photo_caption"
            label="Photo Caption"
            variant="outlined"
            value={photoCaption}
            onChange={(e) => setPhotoCaption(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "25%" }}>
          <TextField
            id="year_taken"
            label="Photo Year"
            variant="outlined"
            value={yearTaken}
            onChange={(e) => setYearTaken(e.target.value)}
          />
        </FormControl>
      </div>
    </Stack>
  );
};

export default AddPhotos;
