import React, { Component } from 'react';
import History from './history';
import Game from './game';



class GameContainer extends Component {
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
                success: 'success',
                guessCount: this.state.guessCount +=1,
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
        const {handleInputChange, handleNumberGuess, reset} = this;
        const{theGuess, guessResponse, styleClass, history, guessCount, lowestScore, success} = this.state;
        const score = `Current Score: ${guessCount} | Top Score: ${lowestScore}`;
        // const responseDiv = `responseDiv ${styleClass}`;
        return (
            <div>
                <Game 
                    resetGame={reset}
                    handleNumberGuess={handleNumberGuess}
                    handleInputChange={handleInputChange}
                    guessCount={guessCount}
                    theGuess={theGuess}
                />
                <History history={history} guessResponse={guessResponse}/>
            </div>

        )
    }
}

export default GameContainer;
