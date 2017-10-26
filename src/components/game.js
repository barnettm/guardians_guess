import React, { Component } from 'react';



class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: '',
            styleClass: ''
        };
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberGuess = this.handleNumberGuess.bind(this);
    }
    getRandomNumber = function(){
        return Math.floor(Math.random()*100)+1
    };


    reset = function(event){
        event.preventDefault();
        this.setState({
            theNumber: this.getRandomNumber(),
            theGuess: '',
            guessResponse: ''
        })
    };

    handleNumberGuess = function(event){
        event.preventDefault();
        const {theGuess, theNumber} = this.state;
        // const {styleClass} = this.state.styleClass;
        if(theGuess == theNumber){
            this.setState({
                guessResponse: 'You Guessed It!!'
            })
        }else if (theGuess > theNumber){
            this.setState({
                guessResponse: 'Too High!!',
                styleClass: 'shake'
            })

        }else{
            this.setState({
                guessResponse: 'Too Low!!',
                styleClass: 'shake'
            })
        }
        this.setState({
            theGuess: '',
        })
    };

    handleInputChange = function(event){
        event.preventDefault();
        this.setState({
            theGuess: event.target.value,
            styleClass: ''
        })
    };


    render(){
        console.log(this.state);
        const {theGuess} = this.state;
        const{guessResponse} = this.state;
        const{styleClass} = this.state;
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
                </div>
                <div className="historyDiv">
                    <ul className="list-group">

                    </ul>
                </div>
            </div>
        )
    }
}

export default Game;
