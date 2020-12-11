import React, { Component } from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class StayHome extends Component {
  constructor() {
  	super();
    this.state = {
		  board : null,
      boardObject: {},
    	numPlayers : 0,
    	numAI : 0,
    	players : [],
      pregame: true,
      currentTurn: null,
      round: 0,
      numTiles: 25,
      currentPlayer: {nameString: 'pregame'},
      resourcePrices: {},
      activeTile: {
        population: 0
      },
      previousActiveIndex: null,
      activeArray: [],
      invalidAction: true,
      currentAction: {
        gather: 0,
        birth: 0,
        rest: 0,
        arms: {
          number: 0,
          target: 0
        }
      }
    };
    this.populateBoard = this.populateBoard.bind(this);
    this.generateTile = this.generateTile.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.setActiveTile = this.setActiveTile.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
  };

  addPlayer = () => {
	  var newNumPlayers = this.state.numPlayers;
    const {players} = this.state;
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    var newPlayer = {
      key: newNumPlayers,
      name: "player " + newNumPlayers,
      color: randomColor,
      wood: 0,
      fiber: 0,
      stone: 0,
      ore: 0,
      grain: 0,
      spice: 0,
      happy: 0
    }

    let newState = Object.assign({}, this.state);
    newState.players[newNumPlayers] = newPlayer;
    var newNumPlayers = this.state.numPlayers + 1;
    newState.numPlayers = newNumPlayers;

	  this.setState(newState);
  };
  handlePlayerNameChange = (e, player) => {
    var playerData = player.player;
    let newState = Object.assign({}, this.state);
    newState.players[playerData.key].nameString = e.target.value;
	  this.setState(newState);
  }

  handleNumTileChange = (e) => {
	  this.setState({numTiles: e.target.value});
  }

  addAI = () => {
  		var newNumAI = this.state.numAI + 1;
	  	this.setState({numAI: newNumAI});
  };
  getResource = (resourceNum) =>{
    if(resourceNum ===0 ){
      return "wood"
    }
    else if(resourceNum ===1 ){
      return "stone"
    }
    else if(resourceNum ===2 ){
      return "fiber"
    }
    else if(resourceNum ===3 ){
      return "ore"
    }
    else if(resourceNum ===4 ){
      return "spice"
    }
    else if(resourceNum ===5 ){
      return "grain"
    }
  }
  generateBoard = () => {
	  var newBoard = [];
    var boardObject = [];
	  var tile;
    var random;
    var activeTile = 78;
    var total = 0;
    var occupiedCheck = [];
    var resource;
    var tileClass;
    var direction;
    var maxNumTiles = this.state.numTiles;
    var maxNumResource = Math.round(maxNumTiles/6) + 3;
    var newActiveArray = [];
    var resourceSoFar = {
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
    }

    function getResource(resourceNum){
      if(resourceNum ===0 ){
        return "wood"
      }
      else if(resourceNum ===1 ){
        return "stone"
      }
      else if(resourceNum ===2 ){
        return "fiber"
      }
      else if(resourceNum ===3 ){
        return "ore"
      }
      else if(resourceNum ===4 ){
        return "grain"
      }
      else if(resourceNum ===5 ){
        return "spice"
      }
    }

    for(var i=0; i < 144; i++){
      tile = <div className="tile emptyTile"></div>;
      occupiedCheck[i] = 0;
      boardObject[i]={
        "occupied": false,
        "controlledBy": null,
        "resource": null,
        "buildings": null,
        "population": null,
        "connectedTo": null,
        "connectedBuildings": null,
        "travelingPopulation": null,
        "classNames": null,
        "isActive": false
      }
      newBoard.push(tile);
      newActiveArray[i] = false;
    }

    while(total < maxNumTiles){
      direction = Math.floor(Math.random() * 4);
      if(direction === 0){
        if(activeTile > 11){
          if(occupiedCheck[activeTile-12] === 0){
            resource = Math.floor(Math.random() * 6);
            if(resourceSoFar[resource]>=maxNumResource){
              resource = Math.floor(Math.random() * 6);
            }
            resourceSoFar[resource] = resourceSoFar[resource] + 1;
            tileClass = getResource(resource) + "Tile tile occupiedTile";
            tile = <div className={tileClass}></div>;
            newBoard[activeTile-12] = tile;
            boardObject[activeTile-12]={
              "occupied": true,
              "controlledBy": null,
              "resource": getResource(resource),
              "buildings": null,
              "population": 5,
              "connectedTo": null,
              "connectedBuildings": null,
              "travelingPopulation": null,
              "classNames": tileClass,
              "isActive": false
            };
            occupiedCheck[activeTile-12] =1;
            total = total+1;
          }
          activeTile = activeTile - 12;
        }
      }
      else if(direction === 1){
        if(activeTile%12 != 11){
          if(occupiedCheck[activeTile+1] === 0){
            resource = Math.floor(Math.random() * 6);
            if(resourceSoFar[resource]>=maxNumResource){
              resource = Math.floor(Math.random() * 6);
            }
            resourceSoFar[resource] = resourceSoFar[resource] + 1;
            tileClass = getResource(resource) + "Tile tile occupiedTile";
            tile = <div className={tileClass}></div>;
            newBoard[activeTile+1] = tile;
            boardObject[activeTile+1]={
              "occupied": true,
              "controlledBy": null,
              "resource": getResource(resource),
              "buildings": null,
              "population": 5,
              "connectedTo": null,
              "connectedBuildings": null,
              "travelingPopulation": null,
              "classNames": tileClass,
              "isActive": false
            };
            occupiedCheck[activeTile+1] =1;
            total = total+1;
          }
          activeTile = activeTile + 1;
        }
      }
      else if(direction === 2){
        if(activeTile < 132){
          if(occupiedCheck[activeTile+12] === 0){
            resource = Math.floor(Math.random() * 6);
            if(resourceSoFar[resource]>=maxNumResource){
              resource = Math.floor(Math.random() * 6);
            }
            resourceSoFar[resource] = resourceSoFar[resource] + 1;
            tileClass = getResource(resource) + "Tile tile occupiedTile";
            tile = <div className={tileClass}></div>;
            newBoard[activeTile+12] = tile;
            boardObject[activeTile+12]={
              "occupied": true,
              "controlledBy": null,
              "resource": getResource(resource),
              "buildings": null,
              "population": 5,
              "connectedTo": null,
              "connectedBuildings": null,
              "travelingPopulation": null,
              "classNames": tileClass,
              "isActive": false
            };
            occupiedCheck[activeTile+12] =1;
            total = total+1;
          }
          activeTile = activeTile + 12;
        }
      }
      else if(direction === 3){
        if(activeTile % 12 != 0){
          if(occupiedCheck[activeTile-1] === 0){
            resource = Math.floor(Math.random() * 6);
            if(resourceSoFar[resource]>=maxNumResource){
              resource = Math.floor(Math.random() * 6);
            }
            resourceSoFar[resource] = resourceSoFar[resource] + 1;
            tileClass = getResource(resource) + "Tile tile occupiedTile";
            tile = <div className={tileClass}></div>;
            newBoard[activeTile -1] = tile;
            boardObject[activeTile -1]={
              "occupied": true,
              "controlledBy": null,
              "resource": getResource(resource),
              "buildings": null,
              "population": 5,
              "connectedTo": null,
              "connectedBuildings": null,
              "travelingPopulation": null,
              "classNames": tileClass,
              "isActive": false
            };
            occupiedCheck[activeTile-1] =1;
            total = total+1;
          }
          activeTile = activeTile - 1;
        }
      }
    }

    this.setState({activeArray: newActiveArray});
		this.setState({board: newBoard});
    this.setState({boardObject: boardObject});
  };
  populateBoard = () => {
    var boardObject = this.state.boardObject;
    var controlledTotal;

    for(var i = 0 ; i < 144; i++){
      boardObject[i].controlledBy = 0;
    }

    console.log("populating board for " + this.state.numPlayers + " players" );
    for(var i = 0 ; i < this.state.numPlayers; i++){
      var randomIndex = Math.floor(Math.random() * 144);
      controlledTotal = 0;
      while(controlledTotal < 2){
        randomIndex = Math.floor(Math.random() * 144);
        if(boardObject[randomIndex].occupied){
          if(!boardObject[randomIndex].controlledBy){
              boardObject[randomIndex].controlledBy = i + 1;
              controlledTotal += 1;
          }
        }
      }
    }

    this.setState({boardObject: boardObject}, this.renderBoard());

  }



  getResource = (resourceNum) => {
    if(resourceNum ===0 ){return "wood"}
    else if(resourceNum ===1 ){return "stone"}
    else if(resourceNum ===2 ){return "fiber"}
    else if(resourceNum ===3 ){return "ore"}
    else if(resourceNum ===4 ){return "grain"}
    else if(resourceNum ===5 ){return "spice"}
  }

  generateTile = (index, tileInfo) => {
   var tileClasses = "tile ";
   var playerControlIcon;
   var tile;
   var players = this.state.players;
   var populationIcon = <div className="populationIcon">{tileInfo.population}</div>;
   var activeIcon = <div className="activeIcon">{populationIcon}</div>;

   if(tileInfo.occupied){
       tileClasses = tileClasses+ "occupiedTile ";
       tileClasses = tileClasses + tileInfo.resource + "Tile ";
       tile = <div className={tileClasses} onClick={(e) => this.setActiveTile(e, index)}></div>;

     if(tileInfo.controlledBy && tileInfo.controlledBy !== 0){
       var playerTileClasses = "playerIcon";
       var playerTileStyle = {backgroundColor: players[tileInfo.controlledBy - 1].color};
       playerControlIcon = <div style={playerTileStyle} className={playerTileClasses}></div>
       if(tileInfo.isActive){
         activeIcon = <div className="activeIcon">{playerControlIcon} {populationIcon}</div>;
         tile = <div className={tileClasses} onClick={(e) => this.setActiveTile(e, index)}>{activeIcon}</div>;
       }
       else{
         tile = <div className={tileClasses} onClick={(e) => this.setActiveTile(e, index)}>{playerControlIcon} {populationIcon}</div>;
       }
     }
     else if(tileInfo.isActive){
       tile = <div className={tileClasses} onClick={(e) => this.setActiveTile(e, index)}>{activeIcon}</div>;
     }

     return tile;
   }
   else{
     tileClasses = tileClasses + "emptyTile ";
     tile = <div className={tileClasses}></div>;
     return tile;
   }
  }

  renderBoard = () => {
    console.log("enter renderBoard...");
    var boardObject = this.state.boardObject;
    var newBoard = [];
    var currentTileInfo;
    for(var i=0; i < 144; i++){
      currentTileInfo = boardObject[i];
      newBoard[i] = this.generateTile(i, currentTileInfo);
    }
    this.setState({board: newBoard});
  }

  setActiveTile = (e, index) => {
    var newBoardData = this.state.boardObject;
    console.log(this.state.activeTile);
    if(this.state.previousActiveIndex){
      newBoardData[this.state.previousActiveIndex].isActive = false;
      newBoardData[index].isActive = true;

      this.setState({currentAction: {
        gather: 0,
        birth: 0,
        rest: 0,
        arms: {
          number: 0,
          target: 0
        }
      }});
      this.setState({activeTile : newBoardData[index]});
      this.setState({previousActiveIndex : index});
      this.setState({boardObject : newBoardData}, this.renderBoard());
    }
    else{
      newBoardData[index].isActive = true;

      this.setState({currentAction: {
        gather: 0,
        birth: 0,
        rest: 0,
        arms: {
          number: 0,
          target: 0
        }
      }});
      this.setState({activeTile : newBoardData[index]});
      this.setState({previousActiveIndex : index});
      this.setState({boardObject : newBoardData}, this.renderBoard());
    }

  }
  confirmAction = () => {

  }
  handleActionChange = (e, action, currentAvailablePopulation) => {
    var newState = Object.assign({}, this.state);
    var population = currentAvailablePopulation;

    if(action === "gather"){
      newState.currentAction.gather = e.target.value;
    }
    else if(action === "rest"){
      newState.currentAction.rest = e.target.value;
    }
    else if(action === "birth"){
      newState.currentAction.birth = e.target.value;
    }
    else if(action === "arms"){
      newState.currentAction.arms.number = e.target.value;
    }

    if(population > 0){
      this.setState(newState);
    }
  }
  startGame = () => {
    this.setState({pregame: false});
    this.setState({currentTurn: 0});
    this.setState({currentPlayer: this.state.players[0]});

    //set resource prices
    var newPrices = [];
    for(var i = 0; i< 5; i++){
      var randomPrice = Math.floor(Math.random() * 5) + 1;
      newPrices[i] = randomPrice;
    }
    newPrices[5] = Math.floor(Math.random() * 10) + 1;

    this.setState({resourcePrices: newPrices});
  }
  endTurn = () => {
    var currentTurn = this.state.currentTurn;
    var nextTurn = this.state.currentTurn + 1;
    var nextRound = this.state.round + 1;


    //see if done with human players
    if(this.state.players[nextTurn]){
      this.setState({currentPlayer: this.state.players[nextTurn]});
      this.setState({currentTurn: nextTurn});
    }
    else{
      //do the ai's turns here
      this.setState({round: nextRound});
      //also do anything to 'reset' for the start of the next round
      //set resource prices
      var newPrices = [];
      for(var i = 0; i< 5; i++){
        var randomPrice = Math.floor(Math.random() * 5) + 1;
        newPrices[i] = randomPrice;
      }
      newPrices[5] = Math.floor(Math.random() * 10) + 1;

      let newState = Object.assign({}, this.state);
      newState.resourcePrices = newPrices;
      newState.currentTurn = 0;
      newState.currentPlayer = this.state.players[0];

  	  this.setState(newState);
    }

  }

  render() {
    const {board} = this.state;
    const {players} =this.state;
    const {currentPlayer} =this.state;
    const {round} =this.state;
    const {resourcePrices} = this.state;
    const {activeTile} = this.state
    let playerResources;
    let playerSettings;
    let currentAvailablePopulation = activeTile.population - this.state.currentAction.gather - this.state.currentAction.birth - this.state.currentAction.rest - this.state.currentAction.arms.number;

    if(players){
    playerSettings = players.map((player, k) =>
    <Row className="playerSttingField">
      <Col>
        <input type="text" value={this.state.players[k].nameString} placeholder={player.nameString} onChange={(e) => this.handlePlayerNameChange(e, {player})}/>
      </Col>
    </Row>
    );
    playerResources = players.map((player, k) =>
      <Row key={k} className="playerResourceRow">
        <Col className="playerName">
          {player.nameString}
        </Col>
        <Col className="happyTile">
          {player.happy}
        </Col>
        <Col className="woodTile">
          {player.wood}
        </Col>
        <Col className="stoneTile">
          {player.stone}
        </Col>
        <Col className="fiberTile">
          {player.fiber}
        </Col>
        <Col className="oreTile">
          {player.ore}
        </Col>
        <Col className="grainTile">
          {player.grain}
        </Col>
        <Col className="spiceTile">
          {player.spice}
        </Col>
      </Row>
    );
  }
  else{console.log("no players yet");}

  	return (
  		<div className="StayHomeContainer">
  			<div className="StayHome">
  				<Container fluid="true" className="stayHomeContainer noPadding">
  					<Row>
  						<Col className="boardArea">
                {board}
  						</Col>
  						<Col className="gameSettings">
  							<div className={this.state.pregame ? 'gameSettings' : 'hidden'}>
  								<Container>
  									<Row>
  										<Col>
  											<button onClick={this.addPlayer}>Add Player</button>
  										</Col>
  										<Col>
  											<button onClick={this.addAI}>Add AI</button>
  										</Col>
                      <Col>
                        <button onClick={this.generateBoard}>Generate Board</button>
  										</Col>
                      <Col>
                        <button onClick={this.populateBoard}>Populate Board</button>
  										</Col>
  									</Row>
                    {playerSettings}
  									<Row>
  										<Col>
  											<p>number of Players: {this.state.numPlayers}</p>
  											<p>number of AI: {this.state.numAI}</p>
  										</Col>
  									</Row>
                    <Row>
                      <Col>
                        <input type="number"  label= "Number of Tiles" value={this.state.numTiles} placeholder={this.state.numTiles} onChange={this.handleNumTileChange}/>
                      </Col>
  									</Row>
                    <Row>
                      <Col>
                        <button onClick={this.startGame}>Start Game</button>
                      </Col>
  									</Row>
  								</Container>
  							</div>
                <div className={this.state.pregame ? 'hidden' : 'currentGameInfo'}>
  								<Container>
  									<Row>
  										<Col>
  											<p>Current Players Turn: {currentPlayer.nameString}</p>
  										</Col>
                      <Col>
  											<p>Current Round: {round}</p>
  										</Col>
                      <Col>
  											<button onClick={this.endTurn}>End Turn</button>
  										</Col>
  									</Row>
  								</Container>
  							</div>
                <div className={this.state.pregame ? 'hidden' : 'gameStats'}>
  								<Container>
  									<Row className="resourceTitles">
  									           <Col>
                               </Col>
                               <Col className="happyTile">
                                 :)
                               </Col>
                               <Col className="woodTile">
                                 Wood: ${resourcePrices[0]}
                               </Col>
                               <Col className="stoneTile">
                                 Stone: ${resourcePrices[1]}
                               </Col>
                               <Col className="fiberTile">
                                 Fiber: ${resourcePrices[2]}
                               </Col>
                               <Col className="oreTile">
                                 Ore: ${resourcePrices[3]}
                               </Col>
                               <Col className="grainTile">
                                 Grain: ${resourcePrices[4]}
                               </Col>
                               <Col className="spiceTile">
                                 Spice: ${resourcePrices[5]}
                               </Col>
  									</Row>
  									{playerResources}
  								</Container>
                  <div>
                    <div className={this.state.activeTile ? 'hidden' : 'gameStats'}>click on a tile controlled by {currentPlayer.nameString}</div>
                    <Container className={this.state.activeTile ? 'actionInputs' : 'hidden'}>
    									<Row className="actionHeaders">
                        <Col className="totalPop">
                          available
                        </Col>
                        <Col className="gatherAction">
                          gather
                        </Col>
                        <Col className="restAction">
                          rest
                        </Col>
                        <Col className="attackAction">
                          arms
                        </Col>
                        <Col className="birthAction">
                          birth
                        </Col>
    									</Row>
                      <Row className="actionInputs">
                        <Col className="totalPop">
                          {currentAvailablePopulation}
                        </Col>
                        <Col className="gatherAction actionInput">
                          <input className="actionNumInput" type="number" value={this.state.currentAction.gather} placeholder={0} onChange={(e) => this.handleActionChange(e, "gather", {currentAvailablePopulation})}/>
                        </Col>
                        <Col className="restAction actionInput">
                          <input className="actionNumInput" type="number" value={this.state.currentAction.rest} placeholder={0} onChange={(e) => this.handleActionChange(e, "rest", {currentAvailablePopulation})}/>
                        </Col>
                        <Col className="attackAction actionInput">
                          <input className="actionNumInput" type="number" value={this.state.currentAction.arms.number} placeholder={0} onChange={(e) => this.handleActionChange(e, "arms", {currentAvailablePopulation})}/>
                        </Col>
                        <Col className="birthActionn actionInput">
                          <input className="actionNumInput" type="number" value={this.state.currentAction.birth} placeholder={0} onChange={(e) => this.handleActionChange(e, "birth", {currentAvailablePopulation})}/>
                        </Col>
    									</Row>
                      <Row className={this.state.invalidAction ? 'invalidAction' : 'hidden'}>
                        Invalid action dummy, run the numbers again
    									</Row>
                      <Row className={this.state.invalidAction ? 'hidden' : 'validAction'}>
                        <button onClick={this.confirmAction}>Confirm</button>
    									</Row>
    								</Container>
                  </div>
  							</div>
  						</Col>
  					</Row>
  				</Container>
  			</div>
  		</div>
  	);
  }
}

export default StayHome;
