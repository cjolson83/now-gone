import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../Components/Comment";

const CommentContainer = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const commentDisplay = comments.map((comments, id) => {
    return <Comment key={comments.id} comments={comments} />;
  });

  return <div>{commentDisplay}</div>;
};

export default CommentContainer;
