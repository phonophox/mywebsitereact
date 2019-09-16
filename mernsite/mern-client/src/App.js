import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import posed, { PoseGroup } from 'react-pose';

import Home from './components/Home';
import Art from './components/Art';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';



const RouteContainer = posed.div({
    enter: { opacity: 1, delay: 300, beforeChildren: true },
    exit: { opacity: 0 }
  });


const App = () => (
  <Route
    render={({location}) => (
    <div className="appContainer">
          <Navbar></Navbar>

          <PoseGroup>
            <RouteContainer key={location.key}>
              <Switch location={location}>
                <Route exact path="/" component={Home} key="home" />
                <Route path="/about" component={About} key="about" />
                <Route path="/art" component={Art} key="art" />
              </Switch>
            </RouteContainer>
          </PoseGroup>
    </div>
    )}
  />
);

export default App;