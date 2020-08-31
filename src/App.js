import React from 'react';
import ConversationList from './components/ConversationList/ConversationList'
import Conversation from './components/Conversation/Conversation'
import Signature from './components/Signature/Signature'
import axios from 'axios/index';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        conversations: [],
        route: 'home',
        lastMutation: [],
        currentConversation: ''
    }
  }


  async getConversations(){
    this.setState({conversations: [],
    lastMutation: []});
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
    // necessary reloading — to populate
    // frontend conversations with
    // any changes we've made
    if (conversation === 'home'){
      this.setState({currentConversation: ''});   
      this.handleUpdate();
    }
    return this.setState({route: conversation, currentConversation: this.state.conversations.filter(c => c.id === conversation)}); 
  }

   // toggles starred status
   starToggler = (conversation) => {
    // filtering the copy, for the conversation
    // we're trying to star
    let targetConversation = this.state.conversations.filter(c => c.id === conversation);
    let starStatus;
    let localStar = localStorage.getItem(`${targetConversation[0].id}-star`)

    if (localStar === "star-filled.svg"){
       console.log('false')
        starStatus = "star.svg";
    }
    else {
        console.log('true')
        starStatus = "star-filled.svg";
    }
    localStorage.setItem(`${targetConversation[0].id}-star`, `${starStatus}`);
    return this.setState({conversations: this.state.conversations})
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
              starToggler = {this.starToggler}
              onRouteChange = {this.onRouteChange}
              getConversations = {this.getConversations}/> :
              <Conversation 
              {...this.state}
              starToggler = {this.starToggler}
              buttonClick = {this.buttonClick}
              onRouteChange = {this.onRouteChange}
              opHandler = {this.opHandler} />}
        </header>
        <Signature />
      </div>
    );
  }
}

export default App;
