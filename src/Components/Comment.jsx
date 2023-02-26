import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "antiquewhite",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Comment = ({ comments }) => {
  return (
    <div className="comment">
      <p>{comments.comment}</p>
    </div>
  );
};

export default Comment;
