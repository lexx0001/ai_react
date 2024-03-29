import React, { forwardRef } from 'react';
import classes from './AuthInput.module.css';

const AuthInput = forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.authInput} {...props} />
    )
});

export default AuthInput;