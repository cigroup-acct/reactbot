import React from 'react';

import './Project.css';

const Project = (props) => {
    return (
        <div className="project_wrapper">
            <h5 className="title">
                {props.payload.fields.title.stringValue}
            </h5>
             <p>
                {props.payload.fields.description.stringValue}
            </p>
            <p>
               LGA: {props.payload.fields.lga.stringValue}
            </p>
            <p>
               Status: {props.payload.fields.status.stringValue}
            </p>
        
        </div>
    )
}


export default Project;