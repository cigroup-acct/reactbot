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
            <a className="btn btn-primary" style= {{ marginRight:10 } }href={props.payload.fields.phone_number.stringValue} >
                    Call
                </a>
            }
           
            {
                props.payload.fields.link.stringValue && 
                <a className="btn btn-primary" href={props.payload.fields.link.stringValue} rel="noopener" alt={props.payload.fields.title.stringValue} target="_blank">
                    Get location
                </a>
            }
            

        </div>
    )
}


export default List;