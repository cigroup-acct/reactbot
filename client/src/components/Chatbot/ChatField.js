import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

import './ChatField.css';


const cookies = new Cookies();

class ChatField extends Component{
  messagesEnd;
  constructor(props) {
    super(props);

    this._handleQuickRepliesPayload = this._handleQuickRepliesPayload.bind(this);
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

  

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return <Message key = {i} who={message.who} text={message.msg.text.text} />;
    }

    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
      return <div key={i}>
        <div className="card-panel">
          <div style={{ overflow: 'hidden' }}>
            <span>
              {message.who}
            </span>

            <div >
              <div style={{ height: 300, width: 500, overflow: 'auto', overflowX: 'scroll', display: 'flex' }}>
                
                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                
              </div>
            </div>
          </div>
        </div>

      </div>
    }
      
    else if (
      message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies
    )
    {
      return <QuickReplies
        text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
        key={i}
        replyClick={this._handleQuickReplyPayload}
        who={message.who}
        payload={message.msg.payload.fields.quick_replies.listValue.values}
      />
    }
  }


  renderMessage(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
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
    this.messagesEnd.scrollIntoView({ behaivour: 'smooth' });
  }

  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value);
      this.df_text_query(e.target.value);
      e.target.value = "";
     
    }
  }

  _handleQuickRepliesPayload(payload, text) {
    this.df_text_query(text);
  }

  render() {
      return (
          <section id="chatfield">
            <div className="chat">
                {this.renderMessage(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el;}}
                    style={{ float: 'left', clear: 'both' }} ></div>
                
            </div>
           <div className="chat-field">
            <div className="chat-field-container">
                <div className="chat-field-flexible">
                       
                    
                    </div>
                    <input
                        onKeyPress={ this._handleInputKeyPress}
                        className="chat-field-input"
                        type="text"
                    />


                </div>
            </div>
       </section> 
        
          
        
        
    )
  }
} 
  

export default ChatField;
