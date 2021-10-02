import React, { useState } from "react";
import  "./App.css";
import Header from "./Header/Header.jsx";
import Content from "./Content/Content.jsx";
import ResourceContext from "../context";

const App = () => {
  const [resource, setResource] = useState('news');
  return (
    <ResourceContext.Provider value={{ resource, setResource }}>
      <div className="app">
        <Header />
        <Content />
      </div>
    </ResourceContext.Provider>
  );
};

export default App;
