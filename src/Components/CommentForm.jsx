import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Fab from "@mui/material/Fab";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import AddCommentIcon from '@mui/icons-material/AddComment';

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
      <FormControl sx={{ width: "92%" }}>
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
        aria-label="add"
        style={{
          backgroundColor: "#424949",
          color: "antiquewhite",
        }}
        onClick={handleSubmit}
      >
        <AddCommentIcon />
      </Fab>
    </div>
  );
};

export default CommentForm;
