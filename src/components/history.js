import React, {Component} from 'react';

class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            history: []
        }
    }
    

    render(){
        console.log(this.state)
        return(
            <li>Test</li>
        ) 
    }

}

export default History;



