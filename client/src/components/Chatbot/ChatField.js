import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message';

import './ChatField.css';


const cookies = new Cookies();

class ChatField extends Component{
  messagesEnd;
  constructor(props) {
    super(props);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.state = {
      messages: []
    };
    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path:'/' })
    }
    console.log(cookies.get('userID'));
  }

  async df_text_query(queryText) {
    let content = {
      who: 'me',
      msg: {
        text: {
          text: queryText
        }
      }

    };

    this.setState({ messages: [...this.state.messages, content ]});

    const res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });

    for (let msg of res.data.fulfillmentMessages) {
      content = {
        who: 'bot',
        msg: msg
      }
      this.setState({ messages: [...this.state.messages, content]});
    }
  } 

  async df_event_query(eventName) {

    const res = await axios.post('/api/df_event_query', { event:eventName, userID: cookies.get('userID')  });

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

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaivour: 'smooth'})
  }

  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      this.df_text_query(e.target.value);
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
            <div ref={(el) => { this.messagesEnd = el;}}
              style={{ float: 'left', clear: 'both' }} >
            
            </div>
          </div>
          <div className="input-wrapper">
            <input type="text" onKeyPress={ this._handleInputKeyPress} className="input" /> 
          </div>
          
        </div>
          
        
          
       
        
        
      </div>
    )
  }
} 
  

export default ChatField;
