import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AuthContext from "../store/AuthContext";

const CommentForm = ({place}) => {
  const [comment, setComment] = useState("");
  const { token, userId } = useContext(AuthContext);
  const placeId = place.id

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/comments",
        {
          placeId,
          userId,
          comment,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        setComment('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="commentform">
      <FormControl sx={{ width: "91.5%" }}>
        <TextField
          id="photo_url"
          label="Comment"
          variant="outlined"
          helperText="Add a story about this place"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormControl>
      <Fab
        size="medium"
        color="#424949"
        aria-label="add"
        onClick={handleSubmit}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default CommentForm;
