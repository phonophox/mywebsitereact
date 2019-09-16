import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar.js'
import posed, { PoseGroup } from 'react-pose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import contactImg from '../images/contactImg.jpeg';


class Contact extends React.Component {

  constructor() {
    super();

    this.state = {

    };
  };


  componentDidMount() {
  };
  render() {


    return (
      <div className="Contact contactBody">

        <Container className="contactInfo">
            <Row className="imgRow">
                <img className="contactPic" src={contactImg}/>
            </Row>
            <Row className="textRow">
                <h1 className="contactText text-center">Below are appropriate ways to contact me and my dog, Sunny. </h1>
            </Row>
            <Row>
                <Col sm={12} md={6}>
                <div className="contactCard">
                    <h1 className="contactHeader">Email for Isaac:</h1>
                    <a href="mailto:isaac.cat.nelson@gmail.com">isaac.cat.nelson@gmail.com</a>
                    <h1 className="contactHeader">Email for Sunny:</h1>
                    <a href="mailto:isaac.cat.nelson@gmail.com">isaac.cat.nelson@gmail.com (ask for Sunny)</a>
                </div>
                </Col>
                <Col sm={12} md={6}>
                <div className="contactCard">
                    <h1 className="contactHeader">Phone for Isaac:</h1>
                    <a href="tel:+1801-706-0818">801-706-0818</a>
                    <h1 className="contactHeader">Phone for Sunny:</h1>
                    <a href="tel:+1801-706-0818">801-706-0818 (ask for Sunny)</a>
                </div>
                </Col>
            </Row>
        </Container>

      </div>
    );
  };
}

export default Contact;