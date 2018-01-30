import React from "react";


export default (props) => {
    const  {theGuess, guessResponse, theNumber, styleClass, history, guessCount, lowestScore, success, handleInputChange, handleNumberGuess, resetGame} = props;
    const score = `Current Score: ${guessCount} | Top Score: ${lowestScore}`;
    console.log('testing')
    return (
        <div>
            <div className="text-center main-area">
                <h1 className="my-3">Guardians Guess</h1>
                <form onSubmit={handleNumberGuess}>
                    <h4>Guess A Number Between 1 and 100</h4>
                    <input type="number" className="input-lg text-center" placeholder="1-100" onChange={handleInputChange} value={theGuess}/>
                    <div className="row justify-content-center">
                        <button className="btn btn-lg btn-outline-danger col-md-2 m-2 text-center reset" type='button' onClick={resetGame}>Reset</button>
                        <button className="btn btn-lg btn-outline-success col-md-2 m-2 text-center guess">Guess</button>
                    </div>
                </form>
                <div className={`${styleClass} responseDiv`}>
                    <h1 className={success}>{guessResponse}</h1>
                </div>
                <div>
                    <p>{score}</p>
                </div>
             </div>
        </div>
    )
}