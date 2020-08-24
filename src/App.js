import React from 'react';
import ConversationList from './components/ConversationList/ConversationList'
import Conversation from './components/Conversation/Conversation'
import axios from 'axios/index';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        conversations: []
    }
  }

  async componentDidMount(){
    try {
      const res = await axios.get('http://localhost:4000/conversations')
      res.data.forEach(i => {
        return this.setState({conversations: this.state.conversations.concat(i) })
      })
    }   
    catch (e) {
    return console.log(e)
    }
  }

  async onClick(e) {
    if (e.target.id ==="delete"){
      const fileName = e.target.parentElement.parentElement.firstChild.textContent;
      const bodyObject = JSON.stringify({"file": fileName})
      await fetch('http://localhost:4000/conversations', {
        headers: { 'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*"},
        body: bodyObject,
        method: 'DELETE'
      })
      .then(response => console.log(response));
      }
    else if (e.target.id === "new"){
      console.log(e.target.id)
    }
    else console.log('star')
}

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Collabatron</h1>
              <ConversationList 
              conversations = {this.state.conversations}
              onClick = {this.onClick}/>
        </header>
      </div>
    );
  }
}

export default App;
