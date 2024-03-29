import React from 'react';
import classes from './FormStyle.module.css';

const FormStyle = ({ children, ...props }) => {
    return (
        <form {...props} className={classes.formStyle}>
            {children}
        </form>
    )
}

export default FormStyle