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
  }, [id]);

  const commentDisplay = comments.map((comments) => {
    return <Comment key={comments.id} comments={comments} />;
  });

  return <div className="CommentContainer">{commentDisplay.length > 0 ? commentDisplay : <p>No stories yet...</p>}</div>;
};

export default CommentContainer;
