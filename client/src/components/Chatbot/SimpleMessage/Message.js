import React from 'react';

import './Message.css';


const Message = (props) => {
    return (
       
                <div className="message">
                    {/* Render this when response is from user */}

                    {props.who === "bot" &&
                    <div className="rich-component ">
                        <p className="rich-bubble" >
                            {props.text}
                        </p>
                        
                    </div>
                    } 
                    
                    {/* Render this when response is from user */}

                    {props.who === "me" &&
                        <div className="rich-component me">
                            <p className="rich-bubble me" >
                                {props.text}
                            </p>
                            
                        </div>
                    } 
                    

                </div>
            
       
  )
}

export default Message; 