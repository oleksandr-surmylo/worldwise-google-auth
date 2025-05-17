import React from 'react';
import styles from './CustomSpinner.module.css';

const CustomSpinner = ( { showSpinner, children } ) => {
    return (
        <>
            <div className={ `${ styles.spinner } ${ showSpinner ? styles.active : '' }` }></div>
            <span>{ children }</span>
        </>
    );
};

export default CustomSpinner;