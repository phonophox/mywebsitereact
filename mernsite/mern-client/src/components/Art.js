import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from './Navbar.js';

import axios from 'axios';
import posed, { PoseGroup } from 'react-pose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';

const ExpandArt = posed.div({
  open: {
    x: 0,
    delayChildren: 200,
    staggerChildren: 20,
    opacity: 1,
    zIndex: 5000,
  },
  closed: { x: 0, zIndex: -1, opacity: 0, delay: 300 }
});

class Art extends React.Component {

  constructor() {
    super();

    this.state = {
        art : [],
        isZoom: false,
        artPics: [],
        zoomedPic: <img />,
        urlList: [],
        picList: [],
        artText: '',
    };
  };


  componentDidMount() {
    axios({
        method:"get",
        url: process.env.NODE_ENV == "development" ? "http://localhost:8082/api/art": "http://mern-site.herokuapp.com/api/art",


    }).then(res => {
          this.setState({
            art: res.data
          })
        })
        .catch(err =>{
          console.log('Error from ShowBookList');
    })
    console.log(process.env.baseURL);

  };

  setZoom = art => {
    console.log("art in setZoom");
    console.log(art);
    this.setState({ zoomedPic: <img className="zoomedPic" onClick={(e) => this.undoZoom()} src={art.art.url}/> });
    this.setState({ isZoom: !this.setState.isZoom });
    this.setState({ artText: art.art.name + ", " + art.art.material + ", " + art.art.size});


  };
  undoZoom = () => {
      this.setState({ isZoom: false });

      console.log(this.state.isZoom);


    };


  render() {
    const art = this.state.art;
    let artList;
    let picList = this.state.picList;
    let zoomedPic = this.state.zoomedPic;
    let isZoom = this.state.isZoom;
    let artText = this.state.artText;
    if(!art) {
      artList = "there is no art record!";
    } else {
      artList = art.map((art, k) =>
        <Carousel.Item className="artSlide" key={k}><img key={k} onClick={(e) => this.setZoom({art})} className="artPic" alt={art.name} src= {art.url}/> </Carousel.Item>
      );
      picList = art.map((art, k) =>
        <img key={k} onClick={(e) => this.setZoom({k})} className="artPic" alt={art.name} src= {art.url}/>
      );
      console.log("picList in render");
      console.log(picList);
    }

    return (
      <div className="Art artBody">

        <Carousel className="artCarousel" interval="5000">
        {artList}
        </Carousel>
        <h1 className="artWelcome text-center">Welcome to the Nelson Gallery</h1>
        <h2 className="artText text-center">Click on an image to view it in fullscreen with more information. Click on it again to exit.</h2>
        <ExpandArt className="expandArt" pose={isZoom ? 'open' : 'closed'}>{zoomedPic} <h1 className="artText text-center">{artText}</h1></ExpandArt>
     </div>
    );
  };
}

export default Art;
