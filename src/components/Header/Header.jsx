import React, { useState, useContext } from "react";
import "./Header.css";
import Button from "../UI/Button/Button.jsx";
import ResourceContext from "../../context";
const Header = ({ isMobile }) => {
  const { resource, setResource } = useContext(ResourceContext);
  const links = [
    {
      title: "News",
    },
    {
      title: "Newest",
    },
    {
      title: "Ask",
    },
    {
      title: "Show",
    },
    {
      title: "Jobs",
    },
  ];

  return (
    <div className="header">
      {links.map((link, id) => {
        return (
          <Button
            isMobile={isMobile}
            type="primary"
            onClick={() => setResource(link.title.toLocaleLowerCase())}
            key={id}
          >
            {link.title}
          </Button>
        );
      })}
    </div>
  );
};

export default Header;
