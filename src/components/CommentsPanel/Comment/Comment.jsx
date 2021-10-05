import React, { useState } from "react";
import { getJSXComments } from "../CommentsPanel.jsx";
import "./Comment.css";


function getName(name) {
  return name === undefined ? "unknown" : name;
}
function createMarkup(string) {
  return {
    __html: string,
  };
}

function getRepliesCount(replies, setShowReplays, showReplays) {
  switch (replies) {
    case 0:
      return null;
    case 1:
      return (
        <div
          onClick={() => setShowReplays((prev) => !prev)}
          className="show-reply"
        >
          {showReplays ? "Hide reply" : "View reply"}
        </div>
      );
    default:
      return (
        <div
          onClick={() => setShowReplays((prev) => !prev)}
          className="show-reply"
        >
          {showReplays ? `Hide ${replies} replies` : `View ${replies} replies`}
        </div>
      );
  }
}

const Comment = ({ name, time, content, replays, comments, level }) => {
  const [showReplays, setShowReplays] = useState(false);
  console.log(comments);

  return (
    <div
      style={{ marginLeft: level === undefined ? 0 : level * 5 + "px" }}
      className="comment-wrapper"
    >
      <div style={{ backgroundColor: "indigo" }} className="comment-avatar">
        {getName(name)[0].toUpperCase()}
      </div>
      <div className="comment-info">
        <div>
          <span style={{ fontWeight: "bold", marginRight: "5px" }}>
            {getName(name)}
          </span>
          <span style={{ color: "gray" }}>{time}</span>
        </div>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
        {getRepliesCount(replays, setShowReplays, showReplays)}
        {showReplays ? getJSXComments(comments) : null}
      </div>
    </div>
  );
};

export default Comment;
