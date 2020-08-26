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
        route: 'home'
    }
  }

  async getConversations(){
    try {
      const res = await axios.get('https://ava-backend.herokuapp.com/conversations')
      res.data.forEach(i => {
        return this.setState({conversations: this.state.conversations.concat(i) })
      })
    }   
    catch (e) {
    return console.log(e)
    }
  }


  onRouteChange = (conversation) =>{

    // got route change figured out 
    // now to link to conversations
    console.log(this.state.route)
    
    return this.setState({route: conversation});
    
  }

  componentDidMount(){
    this.getConversations();
  }

  componentDidUpdate(){
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
              onRouteChange = {this.onRouteChange}/>}
        </header>
      </div>
    );
  }
}

export default App;
