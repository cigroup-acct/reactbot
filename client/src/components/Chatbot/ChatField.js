import React, { Component } from 'react';
import axios from 'axios/index';
import './ChatField.css';


class Chatbot extends Component{
  constructor(props) {
    super(props);
    this.state = {
      messages:[]
    }
  }

  async df_text_query(text) {
    let says = {
      who: 'me',
      msg: {
        text: {
          text: text
        }
      }

    };

    this.setState({ messages: [...this.state.messages], says });

    const res = await axios.post('/api/df_text_query', { text: text });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        who: 'Bot',
        msg: msg
      }
      this.setState({ messages: [...this.state.messages], says });
    }
  } 

  async df_event_query(event) {
    const res = await axios.post('/api/df_event_query', { event });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        who: 'me',
        msg:msg
      }
      this.setState({ messages: [...this.state.messages], says })
    }
  }

  render() {
    return (
      <div className="chatfield">
          <h4>Chatbot</h4>
          <input type="text" className="input"/>
      </div>
    )
  }
} 
  

export default Chatbot;
