import React, { Fragment } from "react";
import "./App.css";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
//import Footer from "./components/layout/Footer";
//import Register from "./components/auth/Register";
//import Login from "./components/auth/Login";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
};

export default App;
