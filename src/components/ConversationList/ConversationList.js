import React from 'react';
import axios from 'axios/index';



class ConversationList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            props
        }
    }

    // renaming conversations on the backend
    async backendRenamer(targetConversation, value){

        const bodyObject = JSON.stringify({
            "file": targetConversation,
            "newName": value})

        await fetch('http://localhost:4000/conversations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'put'
            })
    }

    onInputChange(e) {

    //    TRY TO DO ALL OF THIS BUT WITH A 
    //    KEYUP === ENTER, INSTEAD OF
    //    RENAMING AS YOU GO
    
        console.log(e)

        // shallow copy of conversations array
        let conversations = [...this.props.conversations];

        // filtering the copy, for the conversation
        // we're trying to edit
        let targetConversation = conversations.filter(c => c.id === e.target.placeholder);

        e.target.placeholder = e.target.value; 
        
        // firing the rename function, while our
        // data is freshly targeted
        this.backendRenamer(targetConversation, e.target.value);

        // setting our target conversation's id to
        // to the new name
        targetConversation[0].id = e.target.placeholder;
        
        
        // updating the state, so that 
        // our renaming is reflected on the frontend
        this.setState({conversations: conversations})
    }

    async onClick(e) {

        if (e.target.id ==="delete"){
            const fileName = e.target.parentElement.parentElement.firstChild.firstChild.placeholder;
            const bodyObject = JSON.stringify({"file": fileName})
            await fetch('http://localhost:4000/conversations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'DELETE'
            })
            
          }
        else if (e.target.id === "new"){

            const fileName = "NewConversation" + Date.now()
            console.log(fileName)
            this.setState({conversations: this.props.conversations.push({"id":fileName})})
            
            const bodyObject = JSON.stringify({"file": fileName})
            await fetch('http://localhost:4000/conversations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'POST'
            })
            
        } 
    
        else console.log('star')
    }

    render() {

        let conversations = this.props.conversations;

        return (
            <div className = "container conv-list-container">
                <div className = "row conv-list-ops-row">
                    <div className = "column conv-list-ops-column">
                        <button 
                        onClick = {(e) => {this.onClick(e)}}
                        id = "new"
                        className = "new-button">New+</button>
                    </div>
                </div>
                <div className = "column conv-list-column">
                    {conversations.map((conversation,i) => {
                        return <div 
                        className = "row conv-list-row"
                        key = {`${i}`}>
                        <div className = "column conv-title-column">
                            <input
                            id = "conversation-titles"
                            maxlength = "13"
                            placeholder = {`${conversation.id}`}
                            type = "text" 
                            handleKeyPress = {(e) =>{
                                if(e.key === 'Enter'){
                                    
                                    this.onInputChange(e)
                                }
                            }} 
                            ></input>
                        </div>
                        <div className = "column conv-buttons-column">
                            <img
                            onClick = {(e) => {this.onClick(e)}}
                            alt = "star"
                            src = "./assets/star.svg"
                            id = "star"
                            className = "star-button" />
                            <button 
                            id = "delete"
                            onClick = {(e) => {this.onClick(e)}}
                            className = "delete-button">Delete</button>
                        </div>
                    </div>
                    })}
                </div>
            </div>   
        )
    }
}

export default ConversationList;