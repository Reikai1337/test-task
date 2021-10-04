import React from "react";

const Comment = ({ name, time, content }) => {
  return (
    <div className="comment-wrapper">
      {/* <div>{`${name} ${time}`}</div>
      <p>
        {content}
      </p> */}
      <div>Reikai 5 hours ago</div>
      <p>
        asdasdasdad
      </p>
    </div>
  );
};

export default Comment;
