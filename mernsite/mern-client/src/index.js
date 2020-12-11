import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import posed, { PoseGroup } from 'react-pose';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './App.css';

import Home from './components/Home';
import Art from './components/Art';
import Contact from './components/Contact';
import About from './components/About';
import Navbar from './components/Navbar';
import CreateArt from './components/CreateArt';
import Landing from './components/Landing';
import StayHome from './components/StayHome';


const RouteContainer = posed.div({
    enter: { opacity: 1, delay: 300, beforeChildren: true },
    exit: { opacity: 0 }
  });

const App = () => (
  <Route
    render={({location}) => (
    <div>
          <Navbar></Navbar>

          <PoseGroup>
            <RouteContainer key={location.key}>
              <Switch location={location}>
                <Route exact path="/home" component={Home} key="home" />
                <Route path="/about" component={About} key="about" />
                <Route path="/art" component={Art} key="art" />
                <Route path="/contact" component={Contact} key="contact" />
            	<Route path="/stay-home" component={StayHome} key="stay-home" />
            	<Route path="/create-art" component={CreateArt} key="create-art" />
                <Route path="/" component={Landing} key="landing" />
              </Switch>
            </RouteContainer>
          </PoseGroup>
    </div>
    )}
  />
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
