import React from 'react';
import './Welcome.css'

const Welcome =() => {
    return (
        <div id="welcome-wrapper">
            <div className="img-logo">
                <img className="img-fluid" src="https://res.cloudinary.com/jonddon/image/upload/v1613121688/Lisa/ai-loader-opt_su0br0.gif" alt="logo" />
            </div>
            
                <h1 className="text-center">LISA</h1>
                <h2 className="text-center">
                    (Lagos Information Service Assistant)
                </h2>
            <p className="text-center">
                Welcome, I am LISA, your Lagos virtual assistant. I am here to help you find information on public services 24hrs a day. Type "Hi" to get started
            </p>
        </div>
    )
}
   

export default Welcome;