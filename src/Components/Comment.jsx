import React from "react";
import Divider from '@mui/material/Divider';

const Comment = ({ comments }) => {
  return (
    <div className="comment">
      <p className="commenttext">{comments.comment}</p>
      <Divider variant="middle" />
    </div>
  );
};

export default Comment;
