import React, { Component } from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {forEach} from "react-bootstrap/utils/ElementChildren";

class Board extends Component {

    render() {
      const { board } = this.props;
      var newBoard;
      if(this.props.board){
        for(var i=0; i < 144; i++){
            if(this.props.board[i] === 0){
                newBoard = newBoard + <div className="emptyTile"></div>
            }
            else{
                newBoard = newBoard + <div className="occupiedTile"></div>;
            }
        }
      }
      else{
        console.log('no valid board provided');
      }

      if (!board) {
        return <h1>Loading</h1>;
      }
      else{
        return <div>it totally worked lol</div>;
      }
    }
}

export default Board;
