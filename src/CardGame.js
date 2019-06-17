import React, { Component } from 'react';
import './CardGame.css';
import {Row, Col, Button} from 'react-materialize';


let state = {
    cards: [
        {id: 1, value: 5, fliped: false, found: false},
        {id: 2, value: 2, fliped: false, found: false},
        {id: 3, value: 3, fliped: false, found: false},
        {id: 4, value: 4, fliped: false, found: false},
        {id: 5, value: 4, fliped: false, found: false},
        {id: 6, value: 5, fliped: false, found: false},
        {id: 7, value: 3, fliped: false, found: false},
        {id: 8, value: 1, fliped: false, found: false},
        {id: 9, value: 1, fliped: false, found: false},
        {id: 10, value: 6, fliped: false, found: false},
        {id: 11, value: 7, fliped: false, found: false},
        {id: 12, value: 8, fliped: false, found: false},
        {id: 13, value: 2, fliped: false, found: false},
        {id: 14, value: 9, fliped: false, found: false},
        {id: 15, value: 9, fliped: false, found: false},
        {id: 16, value: 7, fliped: false, found: false},
        {id: 17, value: 8, fliped: false, found: false},
        {id: 18, value: 6, fliped: false, found: false},
    ],
    previousCardInfo: "",
    previousCardObj: "",
    pair: ["", 0],
    round: ["", 1],
    timer: ["", "TIME"],
    nextRoundBtn: "",
    totalCardsOuterObj: [],
    totalCardsInnerObj: [],
    totalCardsImg: [],
    gameDescStartObj: "",
    gameDescGameOverObj: "",
    gameDescCompletedObj: "",
    timeRemaining: "",
    intervalHandle: "",
    gameoverRoundObj: "",
    gameoverPairObj: "",
}

class CardGame extends Component {
    constructor(){
        super();
        var arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,9,9];
        this.initializeValue(arr);
    }

    state = {
        popUpWindowObj: "",
    }

    componentDidMount() {
        this.setState({
            popUpWindowObj : this.popUpWindow,
        });
    }

    render(){
        return(
            <div className="cardgame-bg">
                <Col s={12} className="cardgame-board-title-frame">
                    <h2 className="cardgame-board-title">
                        <img src="https://imgur.com/yYmvqwv.png" alt="decoImg" width="400px" className="cardgame-board-title-img-reverse"/> <br />
                        <div className="cardgame-board-title-name">MEMORY MATCHING CARD GAME </div>
                        <img src="https://imgur.com/NmptngM.png" alt="decoImg" width="400px" className="cardgame-board-title-img"/>
                    </h2>
                    <p className="cardgame-board-desc">
                        The objective of this game is to find all the pairs in a given time. Match all the cards to complete a round. 
                        10 rounds in total to complete the game. <br />As the round progress, you'll have less time to find the pairs.<br />
                    </p>
                </Col>
                <Col s={2} />
                <Col s={8} className="cardgame-board-frame">
                    <Row>
                        <Col s={2} />
                        <Col s={8} className="cardgame-board-in-desc">
                            <Col s={12}><br /></Col>
                            <Col s={4}>
                                <span ref={(obj) => state.pair[0] = obj}>{state.pair[1]}</span> PAIR
                            </Col>
                            <Col s={4}>
                                <span ref={(obj) => state.round[0] = obj}>{state.round[1]}</span> / 10 ROUND
                            </Col>
                            <Col s={4}><span ref={(obj) => state.timer[0] = obj}>{state.timer[1]}</span></Col>
                            <Col s={12}><br /></Col>
                        </Col>
                        <Col s={2} />
                        <div className="cardgame-deck-frame">
                            {state.cards.map((card) =>
                                <Card card={card} key={card.id} window={this.state.popUpWindowObj}/>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <div className="cardgame-newgame-frame"  ref={(obj) => this.popUpWindow = obj}>
                            <GameDescription window={this.state.popUpWindowObj} />
                        </div>
                    </Row>
                    <Row>
                        <div className="cardgame-next-btn" ref={(obj) => state.nextRoundBtn = obj}>
                            <Col s={12}>
                                <Button waves='light' node='a' className="cardgame-next-btn-btn" onClick={this.startNextGame}>
                                    NEXT ROUND
                                </Button>
                            </Col>
                        </div>
                    </Row>
                </Col>
                <Col s={2} />
                <Col s={12} className="cardgame-mobile">
                    <h5>
                        Sorry, <br /><br />
                        This game is only available in PC
                    </h5>
                </Col>
            </div>
        );
    }

    //Shuffle cards
    initializeValue = (arr) => {
        var j, x, i;
        for(i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }

        this.AssignCards(arr);
    }

    //Assign to the cards
    AssignCards = (arr) => {
        for(var i=0; i<state.cards.length; i++){
            state.cards[i].value = arr[i];
        }
    }

    //Click next round button
    startNextGame = () => {
        var arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,9,9];
        state.nextRoundBtn.style.visibility = "hidden";
        this.initializeValue(arr);

        for(var i=0; i<state.cards.length; i++){
            state.totalCardsInnerObj[i].style.transform = "rotateY(0deg)";
            state.cards[i].fliped = false;
            state.cards[i].found = false;
            state.totalCardsOuterObj[i].style.pointerEvents = "auto";

            switch(state.cards[i].value){
                case 1: state.totalCardsImg[i].style.content =  "url('https://imgur.com/lJqkOiY.png')";
                    break;
                case 2: state.totalCardsImg[i].style.content = "url('https://imgur.com/Khbu0WV.png')";
                    break;
                case 3: state.totalCardsImg[i].style.content = "url('https://imgur.com/9owrHl6.png')";
                    break;
                case 4: state.totalCardsImg[i].style.content = "url('https://imgur.com/BYsOxXS.png')";
                    break;
                case 5: state.totalCardsImg[i].style.content = "url('https://imgur.com/iCdizgZ.png')";
                    break;
                case 6: state.totalCardsImg[i].style.content = "url('https://imgur.com/H6rxPkI.png')";
                    break;
                case 7: state.totalCardsImg[i].style.content = "url('https://imgur.com/KhbWOew.png')";
                    break;
                case 8: state.totalCardsImg[i].style.content = "url('https://imgur.com/TDiW0PK.png')";
                    break;
                case 9: state.totalCardsImg[i].style.content = "url('https://imgur.com/8V1KYdM.png')";
                    break;
                default: state.totalCardsImg[i].style.content = "url('')";
            }
        }

        state.pair[1] = 0;
        state.pair[0].innerHTML = state.pair[1];
        state.round[0].innerHTML = state.round[1];

        //TIMER
        clearInterval(state.intervalHandle);

        if(state.round[1] === 2){
            state.timeRemaining = 4.5 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 3){
            state.timeRemaining = 4.0 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 4){
            state.timeRemaining = 3.5 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 5){
            state.timeRemaining = 3.0 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 6){
            state.timeRemaining = 2.5 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 7){
            state.timeRemaining = 2 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 8){
            state.timeRemaining = 1.5 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 9){
            state.timeRemaining = 1 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }else if(state.round[1] === 10){
            state.timeRemaining = .5 * 60;
            state.intervalHandle = setInterval(this.countdownGame, 500);
        }
    }

    //TIMER
    countdownGame = () => {
        var min = Math.floor(state.timeRemaining / 60);
        var sec = state.timeRemaining - (min * 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        var message = min.toString() + ":" + sec;
        state.timer[0].innerHTML = message;
        if (state.timeRemaining === 0){
            console.log("timeout");
            this.gameOverWindow();
            clearInterval(state.intervalHandle);
        }
        state.timeRemaining--;
    }

    //Gameover window
    gameOverWindow = () => {
        state.gameoverPairObj.innerHTML = "Pair : " + state.pair[1];
        state.gameoverRoundObj.innerHTML = "Round : " + state.round[1] + " / 10";
        this.popUpWindow.style.visibility = "visible";
        state.gameDescStartObj.style.visibility = "hidden";
        state.gameDescGameOverObj.style.visibility = "visible";
        for(var i = 0; i < state.cards.length; i++){
            state.totalCardsOuterObj[i].style.pointerEvents = "none";
        }
    }
}

export default CardGame;

var counter = 0; //Counter when flip the card
class Card extends Component {
    state = {
        counter: 0,
    }

    componentDidMount(){
        this.cardOuterObj.style.pointerEvents = "none";
        this.initializeCards(this.deckObj, this.props.card);
        state.totalCardsOuterObj = [...state.totalCardsOuterObj, this.cardOuterObj];
        state.totalCardsInnerObj = [...state.totalCardsInnerObj, this.cardInnerObj];
        state.totalCardsImg = [...state.totalCardsImg, this.deckObj];
    }

    render(){
        return(
            <Col s={2}>
                <div className="cardgame-deck" onClick={this.flipCard} ref={(obj) => this.cardOuterObj = obj}>
                    <div className="cardgame-deck-inner" ref={(obj) => this.cardInnerObj = obj}>
                        <div className="cardgame-deck-back">
                            <img src={require('./imgs/work_cardgame_card.png')} alt="card-back" />
                        </div>
                        <div className="cardgame-deck-front">
                            <img alt="card-front" ref={(obj) => this.deckObj = obj}/>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }

    initializeCards = (obj, card) => {
        switch(card.value){
            case 1: obj.style.content =  "url('https://imgur.com/lJqkOiY.png')";
            break;
            case 2: obj.style.content = "url('https://imgur.com/Khbu0WV.png')";
            break;
            case 3: obj.style.content = "url('https://imgur.com/9owrHl6.png')";
            break;
            case 4: obj.style.content = "url('https://imgur.com/BYsOxXS.png')";
            break;
            case 5: obj.style.content = "url('https://imgur.com/iCdizgZ.png')";
            break;
            case 6: obj.style.content = "url('https://imgur.com/H6rxPkI.png')";
            break;
            case 7: obj.style.content = "url('https://imgur.com/KhbWOew.png')";
            break;
            case 8: obj.style.content = "url('https://imgur.com/TDiW0PK.png')";
            break;
            case 9: obj.style.content = "url('https://imgur.com/8V1KYdM.png')";
            break;
            default: obj.style.content = "url('')";
        }
    }

    flipCard = () => {
        var proceed = false;
        if(counter < 2 && !this.props.card.found){
            //FLIP CARD
            if(!this.props.card.fliped){
                this.cardInnerObj.style.transform = "rotateY(180deg)";
                this.props.card.fliped = true;
                this.cardOuterObj.style.pointerEvents = "none";
            }
            //ALLOW ONLY TWO CARDS AVAILABLE TO BE FLIPED
            if(counter === 0){
                state.previousCardInfo = this.props.card;
                state.previousCardObj = this.cardInnerObj;
            }else if(counter === 1) proceed = true;
            counter++;

            //COMPARISON OF CARDS WHEN TWO CARDS ARE FLIPED
            if(proceed){
                counter = 0;
                //MATCH
                if(state.previousCardInfo.value === this.props.card.value){
                    for(var i = 0; i < state.cards.length; i++){
                        if(state.cards[i].id === state.previousCardInfo.id || state.cards[i].id === this.props.card.id){
                            state.cards[i].found = true;
                        }
                    }
                    //UPDATE PAIR
                    state.pair[1] = state.pair[1] + 1;
                    state.pair[0].innerHTML = state.pair[1];

                    if(state.pair[1] === 9){
                        state.round[1] = state.round[1] + 1;
                        //UPDATE ROUND
                        clearInterval(state.intervalHandle);
                        if(state.round[1] + 1 < 12){
                            state.nextRoundBtn.style.visibility = "visible";
                        }else{
                            state.round[0].innerHTML = state.round[1] - 1;
                            //COMPLETE THE GAME - POP UP WINDOW
                            this.props.window.style.visibility = "visible";
                            state.gameDescStartObj.style.visibility = "hidden";
                            state.gameDescCompletedObj.style.visibility = "visible";
                        }
                    }
                }
                //NOT MATCH
                else if(state.previousCardInfo.value !== this.props.card.value){
                    for(i = 0; i < state.cards.length; i++){
                        state.totalCardsOuterObj[i].style.pointerEvents = "none";
                    }
                    state.previousCardInfo.fliped = false;
                    this.props.card.fliped = false;
                    window.setTimeout(this.flipNotMatching, 400);
                }
            }
        }
    }

    flipNotMatching = () => {
        this.cardInnerObj.style.transform = "rotateY(0deg)";
        state.previousCardObj.style.transform = "rotateY(0deg)";

        //Clickable again
        for(var i = 0; i < state.cards.length; i++){
            state.totalCardsOuterObj[i].style.pointerEvents = "auto";
        }
    }

}

class GameDescription extends Component {
    componentDidMount(){
        state.gameDescStartObj = this.startObj;
        state.gameDescGameOverObj = this.gameOverObj;
        state.gameDescCompletedObj = this.completedObj;
        state.gameoverRoundObj = this.gameOverRoundObj;
        state.gameoverPairObj = this.gameOverPairObj;
    }


    render(){
        return(
            <div>
                <Col s={12}>
                    <this.startDescription />
                    <this.gameoverDescription />
                    <this.completeDescription />
                </Col>
            </div>
        );
    }

    startDescription = () => {
        return(
            <div className="cardgame-desc-start" ref={(obj) => this.startObj = obj}>
                <p>Welcome to memory matching card game!</p>
                <h4>START GAME</h4>
                <Button waves='light' node='a' className="cardgame-desc-btn" onClick={this.closeWindow}>
                    START GAME
                </Button>
            </div>
        );
    }

    gameoverDescription = () => {
        return(
            <div className="cardgame-desc-gameover" ref={(obj) => this.gameOverObj = obj}>
                <h4>GAME OVER</h4>
                <p ref={(obj) => this.gameOverRoundObj = obj}></p>
                <p ref={(obj) => this.gameOverPairObj = obj}></p>
                <Button waves='light' node='a' className="cardgame-desc-btn" href="/work-cardgame">
                    PLAY AGAIN
                </Button>
            </div>
        );
    }

    completeDescription = () => {
        return(
            <div className="cardgame-desc-complete" ref={(obj) => this.completedObj = obj}>
                <h4>Congraturation!</h4>
                <p>You won the game.</p>
                <Button waves='light' node='a' className="cardgame-desc-btn" href="/work-cardgame">
                    PLAY AGAIN
                </Button>
            </div>
        );
    }

    //Disable window - Game starts
    closeWindow = () => {
        this.props.window.style.visibility = "hidden";
        for(var i=0; i<state.totalCardsOuterObj.length; i++){
            state.totalCardsOuterObj[i].style.pointerEvents = "auto";
        }

        state.timeRemaining = 5 * 60;
        state.intervalHandle = setInterval(this.countdownGame, 1000);
    }

    //TIMER
    countdownGame = () => {
        var min = Math.floor(state.timeRemaining / 60);
        var sec = state.timeRemaining - (min * 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        var message = min.toString() + ":" + sec;
        state.timer[0].innerHTML = message;
        if (state.timeRemaining === 0){
            console.log("timeout");
            this.gameOverWindow();
            clearInterval(state.intervalHandle);
        }
        state.timeRemaining--;
    }

    //Gameover window
    gameOverWindow = () => {
        this.gameOverPairObj.innerHTML = "Pair : " + state.pair[1];
        this.gameOverRoundObj.innerHTML = "Round : " + state.round[1] + " / 10";
        this.props.window.style.visibility = "visible";
        state.gameDescStartObj.style.visibility = "hidden";
        state.gameDescGameOverObj.style.visibility = "visible";
        for(var i = 0; i < state.cards.length; i++){
            state.totalCardsOuterObj[i].style.pointerEvents = "none";
        }
    }
}
