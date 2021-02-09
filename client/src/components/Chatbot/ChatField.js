import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';

import './ChatField.css';

class ChatField extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages:[]
    }
  }

  async df_text_query(text) {
    let content = {
      who: 'me',
      msg: {
        text: {
          text: text
        }
      }

    };

    this.setState({ messages: [...this.state.messages], content });

    const res = await axios.post('/api/df_text_query', { text: text });

    for (let msg of res.data.fulfillmentMessages) {
      content = {
        who: 'Bot',
        msg: msg
      }
      this.setState({ messages: [...this.state.messages], content});
    }
  } 

  async df_event_query(event) {
    const res = await axios.post('/api/df_event_query', { event });

    for (let msg of res.data.fulfillmentMessages) {
      let content = {
        who: 'bot',
        msg:msg
      };
      this.setState({ messages: [...this.state.messages, content] });
      console.log(this.state.messages);
    }
  }

  renderMessage(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return <Message key = {i} who={message.who} text={message.msg.text.text} />;
      }); 
    }
    else {
      return null;
    }
  }

  componentDidMount() {
    this.df_event_query('Welcome');
  }

  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.valur);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div >
        <h4>Chatbot</h4>
        
        
        <div className="chatfield">
          <div>
            {this.renderMessage(this.state.messages)}

          </div>
          <div className="input-wrapper">
            <input type="text" className="input" /> 
          </div>
          
        </div>
          
        
          
       
        
        
      </div>
    )
  }
} 
  

export default ChatField;
