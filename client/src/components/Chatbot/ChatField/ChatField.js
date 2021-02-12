import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

// import Welcome from '../Welcome/Welcome';
import Message from '../SimpleMessage/Message';
import Card from '../Cards/Card';
import QuickReplies from '../QuickReplies/QuickReplies';
import List from '../List/List';
import SimpleList from '../SimpleList/SimpleList';
import Project from '../Project/Project';

import '../ChatField/ChatField.css';
import Welcome from '../Welcome/Welcome';


const cookies = new Cookies();

class ChatField extends Component{
  messagesEnd;
  constructor(props) {
    super(props);

    
    this._handleQuickRepliesPayload = this._handleQuickRepliesPayload.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    
    this.state = {
      messages: [],
      showingWelcome: true
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
    try {
      const res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });

      for (let msg of res.data.fulfillmentMessages) {
        content = {
          who: 'bot',
          msg: msg
        }
        this.setState({ messages: [...this.state.messages, content]});
      }
      
    }
    catch (e) {
      content = {
        who: 'bot',
        msg: {
          text: {
            text: "I'm having some troubles, Please refresh this page"
          }
        }

      };
      this.setState({ messages: [...this.state.messages, content] });
      
    }
  } 

  async df_event_query(eventName) {
    try {
      const res = await axios.post('/api/df_event_query', { event:eventName, userID: cookies.get('userID')  });

      for (let msg of res.data.fulfillmentMessages) {
      
        let content = {
          who: 'bot',
          msg:msg
        };

        this.setState({ messages: [...this.state.messages, content] });
      
    }
    
      console.log(this.state.messages);

    }
    catch (e) {
      let content = {
        who: 'bot',
        msg: {
          text: {
            text: "I'm having some troubles, Please refresh this page"
          }
        }

      };
      this.setState({ messages: [...this.state.messages, content] });
    }
  }

   _handleQuickRepliesPayload(payload, text) {
    this.df_text_query(text);
  }

  renderWelcome(messages) {
    console.log(messages.length);
    if (messages.length === 0) {
      return <Welcome />;
    }
    
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderLists(lists) {
    return lists.map((list, i) => <List key={i} payload={list.structValue} />);
  }

  renderSimpleLists(items) {
    return items.map((item, i) => <SimpleList key={i} payload={item.structValue} />);
  }

  renderProjects(projects) {
    return projects.map((project, i) => <Project key={i} payload={project.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return <Message key = {i} who={message.who} text={message.msg.text.text} />;
    }

    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
      return <div key={i}>
        <div className="card-panel">
          <div style={{ overflow: 'hidden' }}>

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
        replyClick={this._handleQuickRepliesPayload}
        who={message.who}
        payload={message.msg.payload.fields.quick_replies.listValue.values}
      />
    }


    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.list) {
      return <div key={i}>
          
        <div style={{ overflowY: 'scroll'}}>
                
          {this.renderLists(message.msg.payload.fields.list.listValue.values)}
                
        </div>
           
      </div>;

    }
    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.simple_list) {
      return <div key={i}>
          
        <div style={{ overflowY: 'scroll'}}>
                
          {this.renderSimpleLists(message.msg.payload.fields.simple_list.listValue.values)}
                
        </div>
           
      </div>;

    }

    else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.project) {
      return <div key={i}>
          
        <div style={{ overflowY: 'scroll'}}>
                
          {this.renderProjects(message.msg.payload.fields.project.listValue.values)}
                
        </div>
           
      </div>;

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

  // componentDidMount() {
  //   this.df_event_query('Welcome');
  // }

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

 

  render() {
    return (
        
          <section id="chatfield">
        <div className="chat">
          {this.renderWelcome(this.state.messages)}
                {this.renderMessage(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el;}}
            style={{ float: 'left', clear: 'both' }} >
            
           
            </div>
          
                
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









