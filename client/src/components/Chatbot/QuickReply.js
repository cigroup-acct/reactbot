import React from 'react';


const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <button  className="btn btn-default m-3"
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
            <a className="btn btn-default m-3" href={props.reply.structValue.fields.link.stringValue}>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        )
    }
    
}

export default QuickReply;