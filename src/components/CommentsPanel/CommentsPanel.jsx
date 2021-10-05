import React, { useEffect, useState } from "react";
import "./CommentsPanel.css";
import Button from "../UI/Button/Button.jsx";
import Comment from "./Comment/Comment.jsx";
import { closeCommends } from "../Content/reducer";
import Loader from "../UI/Loader/index.jsx";
import { API } from "../../API";

function commentGetter(count, comments) {
  return comments.splice(0, count);
}

export function getJSXComments(comments) {
  if (comments.length > 0) {
    return comments.map((comment, id) => {
      return (
        <Comment
          comments={comment.comments}
          key={id}
          name={comment.user}
          time={comment.time_ago}
          content={comment.content}
          replays={comment.comments.length}
          level={comment.level}
        />
      );
    });
  } else {
    return <div>No comments found</div>;
  }
}

const CommentsPanel = ({ id, dispatch }) => {
  const [fetching, setFetching] = useState(true);
  const [comments, setComments] = useState({
    commentsCount: null,
    comments: [],
  });
  const [showedComments, setShowedComments] = useState(0);
  const [loadCount, setLoadCount] = useState(0);
  console.log(comments);
  console.log(showedComments, "showedComments");
  console.log(loadCount, "loadCount");

  useEffect(() => {
    async function fetchComments(resource, id) {
      try {
        const response = await API.get(resource, id);
        console.log(response);
        setComments({
          commentsCount: response.comments.length,
          comments: [...response.comments],
        });
        setLoadCount(
          response.comments.length === 0
            ? 0
            : Math.ceil((response.comments.length / 100) * 10)
        );
      } catch (e) {
        throw e;
      } finally {
        setFetching(false);
      }
    }
    fetchComments("item", id);
  }, []);

  useEffect(() => {
    setShowedComments(loadCount);
  }, [loadCount]);

  const showComments = () => {
    if (
      showedComments + loadCount <= comments.comments.length &&
      showedComments !== comments.comments.length
    ) {
      setShowedComments((prev) => prev + loadCount);
    } else {
      setShowedComments(comments.comments.length);
    }
  };
  return (
    <div className="comments-panel">
      {fetching ? (
        <Loader />
      ) : (
        getJSXComments(commentGetter(showedComments, [...comments.comments]))
      )}
      <div onClick={showComments} className="load-more-comments">
        {showedComments === comments.commentsCount
          ? "No more comments"
          : `Load ${loadCount} more comments`}
      </div>

      <div className="close-comments">
        <Button onClick={() => dispatch(closeCommends())} type="success">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CommentsPanel;
