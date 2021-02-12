import React from 'react';

import './SimpleList.css';

const SimpleList = (props) => {
    return (
        
             <li className="list_wrapper">
                {props.payload.fields.title.stringValue}
            </li>
            
            

    )
}


export default SimpleList;