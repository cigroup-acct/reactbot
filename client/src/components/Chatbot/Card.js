import React from 'react';

const Card = (props) => {
    return (
        <div style={{width:270, paddingRight:30}}>
            <div className="card" style={{ width: "18rem"}}>   
                <img className="card-img-top" alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />

                <div className="card-body">
                    <h5 className="card-title text-dark">
                        
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

