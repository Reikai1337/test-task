import React, { useEffect, useState } from "react";
import "./CommentsPanel.css";
import Button from "../UI/Button/Button.jsx";
import Comment from "./Comment/Comment.jsx";
import { closeCommends } from "../Content/reducer";
import Loader from "../UI/Loader/index.jsx";
import { API } from "../../API";

function getComments(comments) {
  if (comments.length > 0) {
    return comments.map((comment, id) => {
      return (
        <Comment
          key={id}
          name={comment.user}
          time={comment.time_ago}
          content={comment.content}
          replays={comment.comments.length}
        />
      );
    });
  } else {
    return <div>No comments found</div>;
  }
}

const CommentsPanel = ({ id, dispatch }) => {
  const [fetching, setFetching] = useState(true);
  const [comments, setComments] = useState({});
  const [showedComments, setShowedComments] = useState([]);
  
  console.log(comments);
  
  useEffect(() => {
    async function fetchComments(resource, id) {
      try {
        const response = await API.get(resource, id);
        setComments({
          commentsCount: response.comments.length,
          comments: [...response.comments],
        });
        setShowedComments(prev=>prev.concat())
      } catch (e) {
        throw e;
      } finally {
        setFetching(false);
      }
    }
    fetchComments("item", id);
  }, []);
  console.log(comments);
  return (
    <div className="comments-panel">
      {fetching ? <Loader /> : getComments(comments.comments)}
      <div className="load-more-comments">Load more</div>

      <div className="close-comments">
        <Button onClick={() => dispatch(closeCommends())} type="success">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CommentsPanel;
