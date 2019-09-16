import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar.js'
import posed, { PoseGroup } from 'react-pose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import poseLogo from '../images/poseLogo.png';
import bootstrapLogo from '../images/bootstrapLogo.png';
import dockerLogo from '../images/dockerLogo.png';
import reactLogo from '../images/reactLogo.jpeg';
import expressLogo from '../images/expressLogo.png';
import mongoosLogo from '../images/mongoosLogo.png';
import nodeLogo from '../images/nodeLogo.png';
import herokuLogo from '../images/herokuLogo.png';

const Wheel = posed.div({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 20,
    opacity: 1
  },
  closed: { x: '0%', opacity: 0, delay: 300 }
});
const Icon = posed.img({
    hoverable: true,
    pressable: true,
    init: {
    scale: 1,
    },
    press: {
        scale: .98,

    },
    hover : {
        scale: 1.2,

    }
});
const CenterText = posed.div({
   init: {y: 100, opacity: 0},
   open: { opacity: 1, y: 0,
   transition: {
              y: { type: 'spring', stiffness: 200, damping: 25, mass: 1.5, velocity: .51 },
              default: { duration: 400 }
      }},

   closed: { y: 200, opacity: 0, transition: 'easeOut'},
});


const ItemTopRight = posed.div({
  passive: {
    y: ['x', v => v * Math.sin(v * 0.002)],
  },
  open: { x: 0, opacity: 1,
   transition: {
           x: { type: 'spring', stiffness: 300, damping: 25, mass: 2, velocity: .51 },
           default: { duration: 1000 }
   }},
  closed: { x: 100, opacity: 0 },

});
const ItemTopLeft = posed.div({
  passive: {
    y: ['x', v => v * Math.sin(v * 0.002)],
  },
  open: { x: 0, opacity: 1,
   transition: {
           x: { type: 'spring', stiffness: 300, damping: 25, mass: 2, velocity: .51 },
           default: { duration: 1000 }
   }},
  closed: { x: -100, opacity: 0 },

});
const ItemBottomRight = posed.div({
  passive: {
    y: ['x', v => v * Math.sin(v * 0.002)],
  },
  open: { x: 0, opacity: 1,
   transition: {
           x: { type: 'spring', stiffness: 300, damping: 25, mass: 2, velocity: .51 },
           default: { duration: 1000 }
   }},
  closed: { x: -100, opacity: 0 },

});
const ItemBottomLeft = posed.div({
  passive: {
    y: ['x', v => v * Math.cos(v * 0.002)],
  },
  open: { x: 0, opacity: 1,
   transition: {

           x: { type: 'spring', stiffness: 300, damping: 25, mass: 2, velocity: .51 },
           default: { duration: 1000 }
   }},
  closed: { x: -100, opacity: 0 },

});



const AboutCard = posed.div({
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

class About extends React.Component {

  constructor() {
    super();
    this.state = {
    isOpen: false,
    isEnter: false,
    isInit: true,
    hasChange: false,
    counter: true,
    header: "",
    text: "I used a variety of technologies to make this website. Click on an icon to find out more."
    }

  };


  componentDidMount() {
      setTimeout(this.toggle, 1000);
      setTimeout(this.toggleText, 1000);
  }


  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  toggleText = () => this.setState({ isEnter: !this.state.isEnter });

  setText = num => {
      this.setState({ isEnter: false }, () => {
      setTimeout(() => {
            if (num==1){
              this.setState({ text: "test"});
              this.setState({ header: "React"});
            }
            else if (num==2){
              this.setState({ text: "test2"});
              this.setState({ header: "Docker"});
            }
            else if (num==3){
              this.setState({ text: "test2"});
              this.setState({ header: "Express"});
            }
            else if (num==4){
              this.setState({ text: "test2"});
              this.setState({ header: "Heroku"});
            }
            else if (num==5){
              this.setState({ text: "test2"});
              this.setState({ header: "Pose"});
            }
            else if (num==6){
              this.setState({ text: "test2"});
              this.setState({ header: "Node"});
            }
            else if (num==7){
              this.setState({ text: "test2"});
              this.setState({ header: "Mongoose"});
            }
            else if (num==8){
              this.setState({ text: "test2"});
              this.setState({ header: "Bootstrap"});
            }

            else {
              this.setState({ text: "test4"});
            }}
        , 300);
        setTimeout(this.toggleText, 400);
      });
  };

  render() {
    const { isOpen } = this.state;
    const { isEnter } = this.state;

      return (
        <div className= "aboutBody">
          <Container className= "aboutContent" fluid= "true">
          <Wheel className="wheel" pose={isOpen ? 'open' : 'closed'}>
          <Row className="itemRow">
              <Col className="itemCol">
                      <ItemTopLeft className="item itemTopLeft" ><Icon className="logoImage" src={reactLogo} onClick={(e) => this.setText(1)} /></ItemTopLeft>
              </Col>
              <Col className="itemCol">
                  <ItemTopRight className="item itemTopRight"><Icon className="logoImage" src={dockerLogo} onClick={(e) => this.setText(2)}/></ItemTopRight>
              </Col>
              <Col className="itemCol">
                  <ItemTopRight className="item itemTopRight"><Icon className="logoImage" src={expressLogo} onClick={(e) => this.setText(3)}/></ItemTopRight>
              </Col>
          </Row>
          <Row className="itemRow">
                <Col className="itemCol">
                    <ItemTopLeft className="item itemBottomLeft bootstrapLogo"><Icon className="logoImage" src={bootstrapLogo} onClick={(e) => this.setText(8)}/></ItemTopLeft>
                </Col>
                <Col className="itemCol centerCol">
                    <CenterText pose={isEnter ? 'open' : 'closed'} className="text-center"><h3 className= "centerHeader">{this.state.header}</h3><p className="aboutText">{this.state.text}</p></CenterText>
                </Col>
                <Col className="itemCol">
                    <ItemBottomRight className="item itemBottomRight"><Icon className="logoImage" src={herokuLogo} onClick={(e) => this.setText(4)}/></ItemBottomRight>
                </Col>
          </Row>
          <Row className="itemRow">
              <Col className="itemCol">
                  <ItemBottomLeft className="item itemBottomLeft" ><Icon className="logoImage" src={mongoosLogo} onClick={(e) => this.setText(7)}/></ItemBottomLeft>
              </Col>
              <Col className="itemCol">
                  <ItemBottomLeft className="item itemBottomLeft" ><Icon className="logoImage" src={nodeLogo} onClick={(e) => this.setText(6)}/></ItemBottomLeft >
              </Col>
              <Col className="itemCol">
                  <ItemBottomRight className="item itemBottomRight" ><Icon className="logoImage" src={poseLogo} onClick={(e) => this.setText(5)}/> </ItemBottomRight>
              </Col>
          </Row>


          </Wheel>
          </Container>
        </div>
      );
    };
}

export default About;
