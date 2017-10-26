import React, { Component } from 'react';



class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            theNumber: this.getRandomNumber(),
            theGuess: ''
        };
        this.getRandomNumber = this.getRandomNumber.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNumberGuess = this.handleNumberGuess.bind(this);
    }
    getRandomNumber = function(){
        return Math.floor(Math.random()*10)+1
    };


    reset = function(event){
        event.preventDefault();
        console.log('reset clicked');
        this.setState({
            theNumber: this.getRandomNumber(),
            theGuess: ''
        })
    };

    handleNumberGuess = function(event){
        event.preventDefault();
        console.log(this.state.theGuess);
        let theGuess = this.state.theGuess;
        let theNumber = this.state.theNumber;
        if(theGuess == theNumber){
            console.log("You guessed it!!")
        }else if (theGuess > theNumber){
            console.log("Too High!")
        }else{
            console.log('Too Low!')
        }
        this.setState({
            theGuess: ''
        })
    };

    handleInputChange = function(event){
        event.preventDefault();
        this.setState({
            theGuess: event.target.value
        })
    };





    render(){
        console.log(this.state);
        const {theGuess} = this.state;
        return (
            <div className="text-center">
                <h1 className="my-3">Guessing Game</h1>
                <form onSubmit={this.handleNumberGuess}>
                    <h3>Guess A Number Between 1-10</h3>
                    <input type="number" className="input-lg" onChange={this.handleInputChange} value={theGuess}/>
                    <div className="row justify-content-center">
                        <button className="btn btn-lg btn-outline-danger col-md-2 m-3 text-center" type='button' onClick={this.reset}>Reset</button>
                        <button className="btn btn-lg btn-outline-success col-md-2 m-3 text-center">Guess</button>
                    </div>
                </form>
                <div className="responseDiv">
                    <h1>Too Low || Too High</h1>/* response div*/
                </div>
                <div className="historyDiv">
                    <ul className="list-group">

                    </ul>
                </div> /*history div*/
            </div>
        )
    }
}

export default Game;
