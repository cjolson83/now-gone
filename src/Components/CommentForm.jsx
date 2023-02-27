import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import AddCommentIcon from "@mui/icons-material/AddComment";

const CommentForm = ({ place }) => {
  const [comment, setComment] = useState("");
  const { token, userId } = useContext(AuthContext);
  const placeId = place.id;

  function refreshPage() {
    window.location.reload(false);
  }

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
        refreshPage();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
    <p className="photosize">Add a Story</p>
    <div className="commentform">
        <TextField
          className="comment"
          sx={{ mb: "15px" }}
          label="Comment"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
        <AddCommentIcon />
      </Fab>
      </div>
    </div>
    </div>
  );
};

export default CommentForm;
