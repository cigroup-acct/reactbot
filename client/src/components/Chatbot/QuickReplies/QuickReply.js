import React from 'react';

import './QuickReply.css';


const QuickReply = (props) => {
    
    if (props.reply.structValue.fields.payload) {
        return (
            <button  className="btn quick_reply_btn mr-2"
                onClick={() =>
                    props.click(
                        props.reply.structValue.fields.payload.stringValue,
                        props.reply.structValue.fields.text.stringValue
                    )}
            >
                
                {props.reply.structValue.fields.text.stringValue}
            </button>
        )    
    }
    else {
        return (
            <a className="btn quick_reply_btn mr-2" href={props.reply.structValue.fields.link.stringValue} target="_blank" rel="noreferrer" >
                {props.reply.structValue.fields.text.stringValue}
            </a>
        )
    }
    
}

export default QuickReply;