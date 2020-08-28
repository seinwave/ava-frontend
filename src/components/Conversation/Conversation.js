import React  from 'react';
import ReactDOM from 'react-dom'
import * as StringBinding from 'sharedb-string-binding';
import connection from '../Connection/Connection'


// If needed, create a new Doc instance
// for shareDB to communicate with
function createIfNeeded(doc, callback){
    if(!doc){
      doc.create('', callback);
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
        await fetch('http://localhost:4000/mutations', {
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
    if (Object.keys(op[0]).includes('si')){
        lastMutation = `INSERTION @ ${op[0].p}:  ${op[0].si}`
        
    }
    else if (Object.keys(op[0]).includes('sd')){
        lastMutation = `DELETION @ ${op[0].p}:  ${op[0].sd}`
    }


    return this.setState({lastMutation: this.props.lastMutation.push(lastMutation)})
}

    componentDidMount(){
        // Get a reference to the textArea DOM node.
        const textArea = ReactDOM.findDOMNode(this.textArea.current);

        // Create local Doc instance, mapped
        // to the current conversation
        const collection = 'textPads';
        const doc = connection.get(collection, this.props.route);

        let targetConversation = this.props.conversations.filter(c => c.id === this.props.route);
        doc.data = targetConversation[0].content;

        // Getting operation details
        doc.on('op', (op) => {
            return this.opHandler(op);
        });

        // this over-writes existing content...
        // not sure why...
        doc.subscribe(function(err) {
            if (err) throw err;
            createIfNeeded(doc, () => {
            });
            const binding = new StringBinding(textArea, doc);
            binding.setup();
        });
        this.doc = doc;
        
        
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
        const conv = e.target.parentElement.parentElement.firstChild.firstChild.textContent
        this.textEntered(e.target.value, conv)
    }

    render() {

        const { route, conversations } = this.props;
        const currentConversation = conversations.filter(c => c.id === route);
        const lastMutation = this.props.lastMutation[this.props.lastMutation.length-1];

        let spanStyle;
        if (lastMutation){
            if(lastMutation.includes('INSERTION')) {
                spanStyle = '#4bcc14';
            }
            else if (lastMutation.includes('DELETION')) {
                spanStyle =  '#fc845f';
            }
        }
        let star; 
        if (currentConversation[0].star === true){
            star = "star-filled.svg"
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
                    <div className = "row conv-operations-row">
                        <button>undo</button>
                    </div>
                    <div className = "row conv-row">
                        <textarea
                        ref = {this.textArea}
                        doc = {this.doc}
                        defaultValue ={`${currentConversation[0].content}`}
                        onBlur = {this.handleInput}
                        className = "conv-input" 
                        placeholder = 'start typing...'
                        >
                        </textarea>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Conversation;