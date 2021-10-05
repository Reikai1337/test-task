import React, { useState } from "react";
import "./App.css";
import Header from "./Header/Header.jsx";
import Content from "./Content/Content.jsx";
import ResourceContext from "../context";
import { isMobileCheck } from "../utils/checkMobile.js";
import MobileContent from "./MobileContent/MobileContent.jsx";
const App = () => {
  const [resource, setResource] = useState("news");
  const isMobile = isMobileCheck(window.outerWidth);
  return (
    <ResourceContext.Provider value={{ resource, setResource }}>
      <div className="app">
        <Header isMobile={isMobile} />
        {isMobile ? <MobileContent /> : <Content />}
      </div>
    </ResourceContext.Provider>
  );
};

export default App;
