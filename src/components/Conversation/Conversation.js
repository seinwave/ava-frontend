import React  from 'react';
import ReactDOM from 'react-dom'
import * as StringBinding from 'sharedb-string-binding';
import connection from '../Connection/Connection'

// If needed, create a new Doc instance
// for shareDB to communicate with
function createIfNeeded(doc, data, callback){
    if(doc.type === null){
        return doc.create('', callback);
    } else {
        callback();
    }
}
class Conversation extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.textArea = React.createRef();
    }
    

    // saves the input to the doc on the
    // server 
    async textEntered(text, conversation) {
        const bodyObject = JSON.stringify({"text":text, "file":conversation});
        await fetch('https://ava-backend.herokuapp.com/mutations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'POST'
        })
    
    }

    // extracts most recent mutation
    opHandler(op){
        let lastMutation;
        let targetConversation = this.props.conversations.filter(c => c.id === this.props.route);

        if (Object.keys(op[0]).includes('si')){
            lastMutation = `INSERTION @ ${op[0].p}:  ${op[0].si}`
        }
        else if (Object.keys(op[0]).includes('sd')){
            lastMutation = `DELETION @ ${op[0].p}:  ${op[0].sd}`
        }
        this.setState({conversations: targetConversation[0].lastMutation = lastMutation })
        const bodyObject = JSON.stringify({"mutation": lastMutation, "file": targetConversation[0].id})
        fetch('https://ava-backend.herokuapp.com/mutations', {
            headers: { 'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"},
            body: bodyObject,
            method: 'PATCH'
        })
    }


    componentDidMount(){
        // Get a reference to the textArea DOM node.
        const textArea = ReactDOM.findDOMNode(this.textArea.current);
        let targetConversation = this.props.conversations.filter(c => c.id === this.props.route);
        let stringData = targetConversation[0].content;

        // Create local Doc instance, mapped
        // to the current conversation
        const collection = 'textPads';
        const doc = connection.get(collection, `${this.props.route}.json`);

        // Getting operation details
        doc.on('op', (op) => {
            return this.opHandler(op);
        });
        
        // subscribe to the server's updates
        // on the document
        doc.subscribe(function(err) {
            if (err) throw err;
            createIfNeeded(doc, stringData, () => {    
            }); 
            const binding = new StringBinding(textArea, doc);
            binding.setup();
        });
    }


    starClick(e){
       const conversation = this.props.currentConversation.id;
       this.props.starToggler(conversation)
    }


    handleInput(e) {
        const conv = this.props.currentConversation.id
        this.textEntered(e.target.value, conv)
    }

    render() {
        const { currentConversation } = this.props;
        const lastMutation = currentConversation[0].lastMutation;
    
        // latestMutation is green or red
        // depending on what it is
        let spanStyle;
        if (lastMutation){
            if(lastMutation.includes('INSERTION')) {
                spanStyle = '#4bcc14';
            }
            else if (lastMutation.includes('DELETION')) {
                spanStyle =  '#fc845f';
            }
        }

        // star is filled or not,
        // depending on its status
        let star; 
        if (localStorage.getItem(`${currentConversation[0].id}-star`)){
            star = localStorage.getItem(`${currentConversation[0].id}-star`)
        }
        else {star = "star.svg"}
        
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
                            <p className = 'last-mutation'>
                                <span style = {{color: `${spanStyle}`}}>{lastMutation}</span>
                            </p>
                        </div>
                    </div>
                    <div className = "conv-border"></div>
                    <div className = "row conv-row">
                        <textarea
                        ref = {this.textArea}
                        doc = {this.doc}
                        defaultValue = {currentConversation[0].content}
                        onBlur = {this.handleInput}
                        className = "conv-input" 
                        >
                        </textarea>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Conversation;