import React from "react";
import "./CommentsPanel.css";
import Button from "../UI/Button/Button.jsx";
import Comment from "./Comment/Comment.jsx";
import { closeCommends } from "../Content/reducer";

const CommentsPanel = ({ id, dispatch }) => {
  return (
    <div className="comments-panel">
      <Comment />

      <div className="show-answers">Load more</div>

      <div className="close-comments">
        <Button onClick={() => dispatch(closeCommends())} type="success">
          Close
        </Button>
      </div>
    </div>
  );
};

export default CommentsPanel;
