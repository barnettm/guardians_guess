import React, { Component } from 'react';
import History from './history';



class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: '',
            styleClass: '',
            history: [],
            guessCount: 0,
            lowestScore: localStorage.getItem('lowestScore') || 'Not Set',
        };
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberGuess = this.handleNumberGuess.bind(this);
        this.inputHistoryArray = this.inputHistoryArray.bind(this);
        this.getLowestScore = this.getLowestScore.bind(this);
    }
    getRandomNumber = function(){
        return Math.floor(Math.random()*100)+1
    };


    reset = function(event){
        event.preventDefault();
        this.setState({
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: '',
            history: [],
            guessCount: 0,
            success: ''
            
        })
    };

    handleNumberGuess = function(event){
        event.preventDefault();
        const {theGuess, theNumber, guessCount, success} = this.state;
        // const {styleClass} = this.state.styleClass;
        if(theGuess == undefined || theGuess == ''){
            return
        }
        if(theGuess == theNumber){
            this.setState({
                guessResponse: 'You Guessed It!!',
                success: 'success'
            }, () => {
                this.getLowestScore(guessCount)
            })
        }else if (theGuess > theNumber){
            this.setState({
                guessResponse: 'Too High!!',
                styleClass: 'shake',
                guessCount: this.state.guessCount += 1,
            }, () => {
                this.inputHistoryArray()
            })
        }else{
            this.setState({
                guessResponse: 'Too Low!!',
                styleClass: 'shake',
                guessCount: this.state.guessCount += 1,
            }, () => {
                this.inputHistoryArray()
            })
        }
    };

    handleInputChange(event){
        event.preventDefault();
        this.setState({
            theGuess: event.target.value,
            styleClass: ''
        })
    };

    inputHistoryArray() {
        const {history, theGuess, guessResponse } = this.state;
        this.setState({
            history: [`${theGuess} | ${guessResponse}`, ...history],
            theGuess: ''
        })
    }

    getLowestScore(score){
        if(score == 0){
            score = 1;
        }
        const lowestScore = localStorage.getItem('lowestScore');
        if(!lowestScore || lowestScore > score){
            localStorage.setItem('lowestScore', score);
            this.setState({
                lowestScore: score
            })
        }
    }


    render(){
        // console.log(this.state);
        // const {theGuess} = this.state;
        // const{guessResponse} = this.state;
        // const{styleClass} = this.state;
        // const{history} = this.state;
        // const{guessCount} = this.state;
        // const{lowestScore} = this.state;
        // const{success} = this.state;
        const{theGuess, guessResponse, styleClass, history, guessCount, lowestScore, success} = this.state;
        const score = `Current Score: ${guessCount} | Top Score: ${lowestScore}`;
        // const responseDiv = `responseDiv ${styleClass}`;
        return (
            <div className="text-center main-area">
                <h1 className="my-3">Guardians Guess</h1>
                <form onSubmit={this.handleNumberGuess}>
                    <h4>Guess A Number Between 1 and 100</h4>
                    <input type="number" className="input-lg text-center" placeholder="1-100" onChange={this.handleInputChange} value={theGuess}/>
                    <div className="row justify-content-center">
                        <button className="btn btn-lg btn-outline-danger col-md-2 m-2 text-center reset" type='button' onClick={this.reset}>Reset</button>
                        <button className="btn btn-lg btn-outline-success col-md-2 m-2 text-center guess">Guess</button>
                    </div>
                </form>
                <div className={`${styleClass} responseDiv`}>
                    <h1 className={success}>{guessResponse}</h1>
                </div>
                <div>
                    <p>{score}</p>
                </div>
                <History history={history} guessResponse={guessResponse}/>
                </div>
        )
    }
}

export default Game;
