import React from 'react';
import classes from './MessageText.module.css';

const MessageText = ({ children }) => {
    return (
        <div className={classes.messageText}> {children} </div>
    )
};

export default MessageText;