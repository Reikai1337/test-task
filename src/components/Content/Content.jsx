import React, { useEffect, useContext, useState } from "react";
import { API } from "../../API";
import ResourceContext from "../../context";
import "./Content.css";

const Content = () => {
  const { resource } = useContext(ResourceContext);
  const { page, setPage } = useState(1);

  useEffect(() => {
    console.log("Effect", resource);
    async function fetchData(resource, page) {
      try {
        const response = await API.get(resource, page);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
    // fetchData(resource,page)
  }, [resource]);
  return <div className="content">Content</div>;
};

export default Content;