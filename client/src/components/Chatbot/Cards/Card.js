import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div style={{width:270, marginRight:30}}>
            <div className="card bg-dark" style={{ width: "18rem" }}>
                <div className="card_image_wrapper">
                    <img className="card_image" alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                </div>
                

                <div className="card-body">
                    <h5 className="card-title ">
                        
                        {props.payload.fields.header.stringValue}
                    </h5>
                    <p className="card-text">
                        {props.payload.fields.description.stringValue}
                    </p>
                    <p>
                        {props.payload.fields.price.stringValue}
                    </p>

                    <a href="https://google.com" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        
    )
}


export default Card;

