import React from 'react';
import ChatField from './Chatbot/ChatField';
import Header from './Header/Header';

import "./App.css";



const App = () => {
  return (
    <div className="wrapper">
      <Header/>
      <ChatField /> 
    </div>
  )
}

export default App;
