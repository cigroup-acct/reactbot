import React from 'react';


const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            <div className="card-panel grey ligthen-5 z-depth-1">
                <div className="row valign-wrapper">
                    {/* Render this when response is from user */}

                    {props.who === "bot" &&
                    <div className="content">
                        <span className="mr-2" >
                            {props.who}
                        </span>
                        <span>
                            {props.text}
                        </span>
                    </div>
                    } 
                    
                    {/* Render this when response is from user */}

                    {props.who === "me" &&
                        <div className="content">
                            <span className="mr-2" >
                                {props.who}
                            </span>
                            <span>
                                {props.text}
                            </span>
                        </div>
                    } 
                    

                </div>
                
            </div>
        </div>
       
  )
}

export default Message; 