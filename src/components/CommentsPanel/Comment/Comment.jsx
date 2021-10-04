import React from "react";
import "./Comment.css";

function getBackgroundColor() {
  const color = Math.floor(Math.random() * 6 + 1);
  switch (color) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    case 4:
      return "green";
    case 5:
      return "blue";
    case 6:
      return "indigo";
    case 7:
      return "violet";
    default:
      break;
  }
}
function getName(name) {
  return name === undefined ? "unknown" : name;
}
function createMarkup(string) {
  return {
    __html: string,
  };
}

function getRepliesCount(replies) {
  switch (replies) {
    case 0:
      return null;
    case 1:
      return <div className="show-reply">View reply</div>;
    default:
      return <div className="show-reply">{`View ${replies} replies`}</div>;
  }
}

const Comment = ({ name, time, content, replays }) => {
  return (
    <div className="comment-wrapper">
      <div
        style={{ backgroundColor: getBackgroundColor() }}
        className="comment-avatar"
      >
        {getName(name)[0].toUpperCase()}
      </div>
      <div className="comment-info">
        <div>
          {getName(name)} {time}
        </div>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
        {getRepliesCount(replays)}
      </div>
    </div>
  );
};

export default Comment;
