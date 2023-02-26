import React from "react";

const Comment = ({ comments }) => {
  return (
    <div className="comment">
      <p>{comments.comment}</p>
    </div>
  );
};

export default Comment;
