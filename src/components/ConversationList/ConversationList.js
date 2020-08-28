import React from 'react';



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
        return await fetch('http://localhost:4000/conversations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'PUT'
            })
    }

    // if user presses enter,
    // proceed to change convo name
    handleKeyPress(e){
        if (e.charCode ===13){
            e.preventDefault();
            this.frontendRenamer(e)
        }
    }

    // changing the convo name
    // on the frontend
    frontendRenamer(e) {
        // IF NO USER INPUT
        // --> BREAK
        if (e.target.value === ''){
            return console.log('no input')
        }
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
        return e.target.value = '';

    }


    // delete conversations from frontend
    conversationDeleter(file){
        // shallow copy of conversations...
        // ...just in case
        const newConversations = [...this.props.conversations];

        // filtering the copy, for the conversation
        // we're trying to delete
        let targetConversation = newConversations.filter(c => c.id === file);

        // checking if element is in
        // conversations array
        const index = newConversations.indexOf(targetConversation[0])

        // mutating the array with a splice
        this.props.conversations.splice(index,1)

        
        // using the index to splice
        // our conversation array
        this.setState({conversations: 
            this.props.conversations})

    }

     // toggles starred status
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

    // prevents clicks from
    // bubbling up to rowClick event;
    clickStopper(e){
        e.stopPropagation();
    }

    async buttonClick(e) {

        e.stopPropagation();
    
        if (e.target.id ==="delete"){
            const fileName = e.target.parentElement.parentElement.firstChild.firstChild[0].placeholder;
            
            const bodyObject = JSON.stringify({"file": fileName})
    
            // reflect deletion in frontend
            this.conversationDeleter(fileName)
    
            return await fetch('http://localhost:4000/conversations', {
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
            return await fetch('http://localhost:4000/conversations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'POST'
            })
        } 
    
        else {
            const conversationName = e.target.parentElement.parentElement.firstChild.firstChild[0].placeholder;
            return this.starToggler(conversationName);
        }
    }

    rowClick(e){
        
        const conversation = e.target.firstChild.firstChild.firstChild.placeholder

        return this.props.onRouteChange(conversation)
        
    }



    render() {

        let conversations = this.props.conversations;
        let star = ""

        return (
            <div className = "container conv-list-container">
                <div className = "row conv-list-ops-row">
                    <div className = "column conv-list-ops-column">
                        <button 
                        onClick = {(e) => {this.buttonClick(e)}}
                        id = "new"
                        className = "new-button">New+</button>
                    </div>
                </div>
                <div className = "column conv-list-column">
                    {conversations.map((conversation,i) => {
                        if (conversation.star === true){
                            star = "star-filled.svg";
                        }
                        else {
                            star = "star.svg";
                        }
                        return <div 
                        className = "row conv-list-row"
                        key = {`${i}`}
                        onClick = {(e) => this.rowClick(e)}>
                        <div className = "column conv-title-column">
                            <form onSubmit = {this.handleSubmit}>
                                <input
                                id = "conversation-titles"
                                maxLength = "30"
                                placeholder = {`${conversation.id}`}
                                type = "textarea"
                                onClick = {(e) => {this.clickStopper(e)}}
                                onBlur = {(e) => {this.frontendRenamer(e)}} 
                                onKeyPress = {(e) => this.handleKeyPress(e)}
                                ></input>
                            </form>
                        </div>
                        <div className = "column conv-buttons-column"
                        onClick = {(e) => {this.clickStopper(e)}}>
                            <img
                            onClick = {(e) => {this.buttonClick(e)}}
                            alt = "star"
                            src = {`./assets/${star}`}
                            id = "star"
                            className = "star-button"/>
                            <button 
                            id = "delete"
                            onClick = {(e) => {this.buttonClick(e)}}
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