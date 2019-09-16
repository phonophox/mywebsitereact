import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar.js'
import posed, { PoseGroup } from 'react-pose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import code1 from '../images/code1.png';
import code2 from '../images/code2.png';
import code3 from '../images/code3.png';
import paint1 from '../images/paint1.jpg';
import paint2 from '../images/paint2.jpg';
import paint3 from '../images/paint3.jpg';
import paint4 from '../images/paint4.jpg';

const ItemContainer = posed.div({
  open: {
    x: 0,
    delayChildren: 200,
    staggerChildren: 400,
    opacity: 1,

  },
  closed: {x: 0, opacity: 1, delay: 300 }
});
const LandingItem = posed.div({
  open: {
    y: 0,
    opacity: 1,
    transition: {

          duration: 2000
        }
  },
  closed: { y: 200, opacity: 0, delay: 30 }
});


class Landing extends React.Component {

  constructor() {
    super();

    this.state = {
    isOpen: false
    };
  };


  componentDidMount() {
    setTimeout(this.toggle, 50);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;

    return (
      <div className="Landing landingBody">

           <Container fluid="true" className="landingContainer">
           <ItemContainer className="itemContainer" pose={isOpen ? 'open' : 'closed'}>
            <Row className="landingRow">

                <Col className="landingCol">
                    <LandingItem className="landingItem"><img className="landingImg" src={paint1} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={code1} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={paint4} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={code2} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={paint3} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={code3} /></LandingItem>
                </Col>
                <Col className="landingCol">
                    <LandingItem><img className="landingImg" src={paint2} /></LandingItem>
                </Col>

            </Row>
            </ItemContainer>
           </Container>
           <div className="landingText">
           <Link to="/home" className="landingLink">
           <h1 className="landingHeader1 text-center">Designing, Creating, Innovating</h1>
           <h3 className="landingHeader2 text-center"> Click here to find out more and explore my website. </h3>

           </Link>
           </div>


      </div>
    );
  };
}

export default Landing;