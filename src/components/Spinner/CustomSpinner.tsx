import React, { ReactNode } from 'react';
import styles from './CustomSpinner.module.css';


type SpinnerProps = {
    children: ReactNode;
    showSpinner: boolean;
}

const CustomSpinner = ( { showSpinner, children }: SpinnerProps ) => {
    return (
        <>
            <div className={ `${ styles.spinner } ${ showSpinner ? styles.active : '' }` }></div>
            <span>{ children }</span>
        </>
    );
};

export default CustomSpinner;