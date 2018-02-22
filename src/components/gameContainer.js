import React, { Component } from 'react';
import History from './history';
import Game from './game';




class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: '',
            styleClass: '',
            history: [],
            guessCount: 0,
            lowestScore: localStorage.getItem('lowestScore') || 'Not Set',
            disabled: 'disabled'
        };
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberGuess = this.handleNumberGuess.bind(this);
        this.inputHistoryArray = this.inputHistoryArray.bind(this);
        this.getLowestScore = this.getLowestScore.bind(this);
    }

/***************************************************************************************************
 * getRandomNumber - Generates random number 1-100.  This is the number to be guessed
 * @param: {undefined} none
 * @returns: number
 * @calls: none
 */
    getRandomNumber = function () {
        return Math.floor(Math.random() * 100) + 1
    };

/***************************************************************************************************
 * reset - resets game and restores state / variables to default
 * @param: {event} none
 * @returns: {undefined} none
 */
    reset = function (event) {
        event.preventDefault();
        this.setState({
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: '',
            history: [],
            guessCount: 0,
            success: '',
        })
    };

    handleNumberGuess = function (event) {
        event.preventDefault();
        const { theGuess, theNumber, guessCount, success } = this.state;

        if (theGuess == undefined || theGuess == '') {
            return
        }

        if (theGuess == theNumber) {
            this.setState({
                guessResponse: 'You Guessed It!!',
                success: 'success',
                guessCount: this.state.guessCount += 1,
            }, () => {
                this.inputHistoryArray()
                this.getLowestScore(guessCount)
            })
        } else if (theGuess > theNumber) {
            this.setState({
                guessResponse: 'Too High!!',
                styleClass: 'shake',
                guessCount: this.state.guessCount += 1,
            }, () => {
                this.inputHistoryArray()
            })
        } else {
            this.setState({
                guessResponse: 'Too Low!!',
                styleClass: 'shake',
                guessCount: this.state.guessCount += 1,
            }, () => {
                this.inputHistoryArray()
            })
        }
    };
/***************************************************************************************************
 * handleInputChange - set state for input
 */
    handleInputChange(event) {
        const {theGuess, disabled} = this.state;
        
        event.preventDefault();
        this.setState({
            theGuess: event.target.value,
            styleClass: '',
            disabled: 'false'
        })
    };
  
/***************************************************************************************************
 * inputHistoryArray - set state for guess response / history
 */    

    inputHistoryArray() {
        const { history, theGuess, guessResponse } = this.state;
        this.setState({
            history: [`${theGuess} | ${guessResponse}`, ...history],
            theGuess: ''
        })
    }
/***************************************************************************************************
 * getLowestScore - checks current score against localStorage score and sets localStorage to top score
 * @param: {score} 
 */
    getLowestScore(score) {
        const lowestScore = localStorage.getItem('lowestScore');
        if (!lowestScore || lowestScore > score) {
            localStorage.setItem('lowestScore', score);
            this.setState({
                lowestScore: score
            })
        }
    }


    render() {
        const { handleInputChange, handleNumberGuess, reset } = this;
        const { theGuess, disabled, guessResponse, styleClass, history, guessCount, lowestScore, success, theNumber } = this.state;
        // const responseDiv = `responseDiv ${styleClass}`;
        return (
            <div>
                <Game
                    resetGame={reset}
                    handleNumberGuess={handleNumberGuess}
                    handleInputChange={handleInputChange}
                    guessCount={guessCount}
                    theGuess={theGuess}
                    styleClass={styleClass}
                    guessResponse={guessResponse}
                    success={success}
                    lowestScore={lowestScore}
                    disabled={disabled}

                />
                <History history={history} guessResponse={guessResponse}/>
            </div>
        )
    }
}

export default GameContainer;
