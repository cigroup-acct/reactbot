import React, { Component } from 'react';
import QuickReply from './QuickReply';


class QuickReplies extends Component{
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }
    
    _handleClick(text) {
        this.props.replyClick(text);
    }

    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
            })
        }
        else {
            return null;
        }
    }



    render() {
        return (
            <div className="quick_replies">
                <div className="quick_reply_items">
                    { this.props.text &&
                        <p>
                            {this.props.text.stringValue}
                        </p>
                    }

                    {this.renderQuickReplies(this.props.payload)}

                </div>

            </div>
        )
    }
}
    
export default QuickReplies;