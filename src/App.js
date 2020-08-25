import React from 'react';
import ConversationList from './components/ConversationList/ConversationList'
import Conversation from './components/Conversation/Conversation'
import axios from 'axios/index';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        conversations: [],
    }
  }

  async getConversations(){
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

  componentDidMount(){
    this.getConversations();
  }

  componentDidUpdate(){
  }



  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Collabatron</h1>
              <ConversationList 
              {...this.state}
              onClick = {this.onClick}
              getConversations = {this.getConversations}/>
        </header>
      </div>
    );
  }
}

export default App;
