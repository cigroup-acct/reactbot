import React from 'react';

const Welcome =() => {
    return (
            <div>
            <img src="https://res.cloudinary.com/jonddon/image/upload/v1613121688/Lisa/ai-loader-opt_su0br0.gif" alt="logo" style={{ display: 'flex', justifyContent: 'center', width: '400px', margin: 'auto' }} />
                <h1 className="text-center">LISA</h1>
                <h2 className="text-center">
                    (Lagos Information and Service Assistant)
                </h2>
            <p className="text-center">
                LISA is a conversational AI chatbot that gives you information about Lagos, Covid related information, Road diversions. Send 'Hi' to get started. 
            </p>
        </div>
    )
}
   

export default Welcome;