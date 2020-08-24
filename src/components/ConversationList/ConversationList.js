import React from 'react';



class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props
        }
    }


    render() {

        let conversations = this.props.conversations;

        return (
            <div className = "container conv-list-container">
                <div className = "row conv-list-ops-row">
                    <div className = "column conv-list-ops-column">
                        <button 
                        onClick = {(e) => {this.props.onClick(e)}}
                        id = "new"
                        className = "new-button">New+</button>
                    </div>
                </div>
                <div className = "column conv-list-column">
                    {conversations.map((conversation) => {
                        return <div className = "row conv-list-row">
                        <div className = "column conv-title-column">
                            <p>{`${conversation.id}`}</p>
                        </div>
                        <div className = "column conv-buttons-column">
                            <button 
                            onClick = {(e) => {this.props.onClick(e)}}
                            id = "star"
                            className = "star-button">Star</button>
                            <button 
                            id = "delete"
                            onClick = {(e) => {this.props.onClick(e)}}
                            className = "delete-button">Delete</button>
                        </div>
                    </div>
                    })}
                </div>
            </div>   
        )
    }
}

export default ConversationList;