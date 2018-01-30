import React from 'react';

export default (props) => {
        const savedGuess = props.history.map((value, index) =>{
            return (
                <div key={index}>
                    <li className="guessNumber">{value}</li>
                </div>
            )
        })
    return (
        <ul className="list-group history text-center">
            {savedGuess}
        </ul>
    )

}





