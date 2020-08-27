import React from 'react';
import axios from 'axios/index';



class Conversation extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    
    async textEntered(text) {
        try {
            const res = await axios.get('https://ava-backend.herokuapp.com/info') 
            return console.log(res.data.author)
        }   
        catch (e) {
        return console.log(e)
        }
    }

    starToggler(conversation){
        // filtering the copy, for the conversation
        // we're trying to star
        let targetConversation = this.props.conversations.filter(c => c.id === conversation);

        if (targetConversation[0].star){
            targetConversation[0].star = !targetConversation[0].star;
        }
        else {
            targetConversation[0].star = true;
        }
        return this.setState({conversations: this.props.conversations})
    }

    starClick(e){
       const conversation = e.target.parentElement.textContent;
       this.starToggler(conversation)
    }


    handleInput(e) {
        this.textEntered(e.target.value)
    }

    render() {

        const { route, conversations } = this.props;
        const currentConversation = conversations.filter(c => c.id === route);

        console.log(currentConversation)

        if (currentConversation[0].star === true){
            var star = "star-filled.svg"
        }
        else {var star = "star.svg"}

        return (
            <div className = "container conv-container">
                <div className = "row conv-input-ops-row">
                    <div className = "column conv-input-ops-column">
                        <button 
                        onClick = {(e) => {this.props.onRouteChange('home')}}
                        id = "new"
                        className = "home-button"> ←Home</button>
                    </div>
                </div>
                <div className = "column conv-column">
                    <div className = "row conv-label-row">
                        <div className = "column conv-label-column">
                            <img
                            onClick = {(e) => {this.starClick(e)}}
                            alt = "star"
                            src = {`./assets/${star}`}
                            id = "star"
                            className = "star-button"/> 
                            <p>{`${currentConversation[0].id}`}</p>
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
                        placeholder = 'start typing...'
                        defaultValue ={`${currentConversation[0].content}`}>
                        </textarea>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Conversation;