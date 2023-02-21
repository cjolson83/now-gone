import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

const AddPhotos = () => {
  const [photos, setPhotos] = useState([]);

  return (
    <div className="photoinput">
      <FormControl sx={{ width: "85%" }}>
        <TextField id="photo_url" label="Photo URL" variant="outlined" />
      </FormControl>
      <Fab
        color="primary"
        aria-label="add"
        size="medium"
        style={{
          backgroundColor: "#424949",
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddPhotos;
