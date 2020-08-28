import React from 'react';
import ConversationList from './components/ConversationList/ConversationList'
import Conversation from './components/Conversation/Conversation'
import axios from 'axios/index';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        conversations: [],
        route: 'home',
        lastMutation: []
    }
  }

  intervalID;

  async getConversations(){
    this.setState({conversations: [],
    lastMutation: []});
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


  onRouteChange = (conversation) =>{

    // necessary reloading — to populate
    // frontend conversations with
    // any changes we've made
    if (conversation === 'home'){
    this.handleUpdate();
    }
       
    return this.setState({route: conversation}); 
  }


  componentDidMount(){
    this.getConversations();
    
  }


  handleUpdate(){
    this.getConversations();
  }


  render(){

    const { route } = this.state; 
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Collabatron</h1>
          { route === 'home' ?
              <ConversationList 
              {...this.state}
              buttonClick = {this.buttonClick}
              onRouteChange = {this.onRouteChange}
              getConversations = {this.getConversations}/> :
              <Conversation 
              {...this.state}
              buttonClick = {this.buttonClick}
              onRouteChange = {this.onRouteChange}
              opHandler = {this.opHandler} />}
        </header>
      </div>
    );
  }
}

export default App;
