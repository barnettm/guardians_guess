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
            guessCount: 0
            
        })
    };

    handleNumberGuess = function(event){
        event.preventDefault();
        const {theGuess, theNumber, guessCount} = this.state;
        // const {styleClass} = this.state.styleClass;
        if(theGuess == undefined || theGuess == ''){
            return
        }
        if(theGuess == theNumber){
            this.setState({
                guessResponse: 'You Guessed It!!'
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
        const lowestScore = localStorage.getItem('lowestScore');
        if(!lowestScore || lowestScore > score){
            localStorage.setItem('lowestScore', score);
            this.setState({
                lowestScore: score
            })
        }
    }


    render(){
        console.log(this.state);
        const {theGuess} = this.state;
        const{guessResponse} = this.state;
        const{styleClass} = this.state;
        const{history} = this.state;
        const{guessCount} = this.state;
        const{lowestScore} = this.state;
        const score = `Current Attempts: ${guessCount} | Best Score: ${lowestScore}`;
        return (
            <div className="text-center">
                <h1 className="my-3">Guessing Game</h1>
                <form onSubmit={this.handleNumberGuess}>
                    <h3>Guess A Number Between 1-100</h3>
                    <input type="number" className="input-lg text-center" onChange={this.handleInputChange} value={theGuess}/>
                    <div className="row justify-content-center">
                        <button className="btn btn-lg btn-outline-danger col-md-2 m-3 text-center" type='button' onClick={this.reset}>Reset</button>
                        <button className="btn btn-lg btn-outline-success col-md-2 m-3 text-center">Guess</button>
                    </div>
                </form>
                <div className={styleClass}>
                    <h1>{guessResponse}</h1>
                    {score}
                </div>
                <History history={history} guessResponse={guessResponse}/>
                </div>
        )
    }
}

export default Game;
