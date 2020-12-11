import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar.js'
import posed, { PoseGroup } from 'react-pose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import code1 from '../images/code1.png';
import paint1 from '../images/paint1.jpg';


const Card = posed.div({
    hoverable: true,
    pressable: true,
    press: {
        scale: .98,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    },
    hover : {
        scale: 1.02,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
  open: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 800, damping: 40 },
      default: { duration: 700 }
    }
  },
  closed: {
    y: 50,
    opacity: 0
  }
});

const Banner = posed.div({
  open: {
    opacity: 1,
    transition: {
    duration: 1000
    }
  },
  closed: {
    opacity: 0
  }
});
const BannerText = posed.p({
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0
  }
});

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
    isOpenBanner: false,
    isOpen1: false,
    isOpen2: false,
    isOpen3: false
    };
  };


  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpenBanner: !this.state.isOpenBanner })
    }, 500);
    setTimeout(() => {
      this.setState({ isOpen1: !this.state.isOpen1 })
    }, 1000);
    setTimeout(() => {
      this.setState({ isOpen2: !this.state.isOpen2 })
    }, 1500);
    setTimeout(() => {
      this.setState({ isOpen3: !this.state.isOpen3 })
    }, 2000);

  };
  render() {


    return (
      <div className="Home homeBody">

            <Banner className="welcomeBanner banner" key="banner" pose={this.state.isOpenBanner ? 'open' : 'closed'}>
                <div key="welcome" id="heroText">
                    <p id="welcome" className="text-center">Welcome to my website</p>
                    <p className="message text-center">My name is Isaac Nelson, and I have made this website to showcase my work.</p>
                    <p className="message text-center">There are three other pages to this site.</p>
                </div>
            </Banner>
            <Container className="cards">
                <Row className="w100 cardRow">
                    <Col md={4}>
                      <Card className="card" key="card"  pose={this.state.isOpen1 ? 'open' : 'closed'}>
                          <Link to="/about" id="card1"  className="info-card">
                            <div className="info-header">
                              <header className="text-center cardHeader">About</header>
                            </div>
                            <div className="cardImg">
                                <img src=""/>
                            </div>
                            <div className="info">
                              <p className="text-center cardText">Information about the libraries and makings of this website.</p>
                            </div>
                          </Link>
                      </Card>
                    </Col>
                    <Col md={4}>
                    <Card className="card" key="card" pose={this.state.isOpen2 ? 'open' : 'closed'}>
                      <Link to="/art" id="card1"  className="info-card">
                        <div className="info-header">
                          <header className="text-center cardHeader">Artwork</header>
                        </div>
                        <div className="cardImg">
                            <img />
                        </div>
                        <div className="info">
                          <p className="text-center cardText">A gallery of my recent artworks, both physical and digital.</p>
                        </div>
                      </Link>
                      </Card>
                    </Col>
                    <Col md={4}>
                    <Card className="card" key="card" pose={this.state.isOpen3 ? 'open' : 'closed'}>
                      <Link to="/contact" id="card1"  className="info-card">
                        <div className="info-header">
                          <header className="text-center cardHeader">Contact</header>
                        </div>
                        <div className="cardImg">
                            <img />
                        </div>
                        <div className="info">
                          <p className="text-center cardText">Further information and contact info for me or my dog.</p>
                        </div>
                      </Link>
                      </Card>
                    </Col>
                </Row>
            </Container>

      </div>
    );
  };
}

export default Home;