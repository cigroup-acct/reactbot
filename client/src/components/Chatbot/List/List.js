import React from 'react';

import './List.css';

const List = (props) => {
    return (
        <div className="list_wrapper">
            <h5 className="title">
                {props.payload.fields.title.stringValue}
            </h5>
             <p>
                {props.payload.fields.description.stringValue}
            </p>
            {
                props.payload.fields.phone_number.stringValue !=="#" &&
            <a className="btn list-btn" style= {{ marginRight:10 } } href={"tel:" + props.payload.fields.phone_number.stringValue} target="_blank" rel="noreferrer">
                    Call
                </a>
            }
           
            {
                props.payload.fields.link.stringValue && 
                <a className="btn list-btn" href={props.payload.fields.link.stringValue} alt={props.payload.fields.title.stringValue} target="_blank" rel="noreferrer">
                    Get location
                </a>
            }
            

        </div>
    )
}


export default List;