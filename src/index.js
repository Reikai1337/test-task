import React from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");
import App from "./components/App.jsx";

render(<App/>, document.getElementById("root"));
