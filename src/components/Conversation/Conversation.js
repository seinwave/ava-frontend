import React from 'react';
import axios from 'axios/index';



class Conversation extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    
    async textEntered(text) {
        try {
            const res = await axios.get('http://localhost:4000/info') 
            return console.log(res.data.author)
        }   
        catch (e) {
        return console.log(e)
        }
    }


    handleInput(e) {
        this.textEntered(e.target.value)
    }

    render() {

        return (
            <div className = "container conv-container">
                <div className = "column conv-column">
                    <div className = "row conv-label-row">
                        <div className = "column conv-label-column">
                            <p>Star-status</p>
                            <p>Conv_name</p>
                        </div>
                        <div className = "column conv-last-mutation-column">
                            <p>what if the last mutation is a really really really really
                                really really really really long mutation
                            </p>
                        </div>
                    </div>
                    <div className = "conv-border"></div>
                    <div className = "row conv-operations-row">
                        <button>undo</button>
                    </div>
                    <div className = "row conv-row">
                        <textarea 
                        onKeyPress = {this.handleInput}
                        className = "conv-input" 
                        placeholder = 'start typing...'>
                        </textarea>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Conversation;