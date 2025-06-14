import { MouseEvent, ReactNode } from 'react';
import styles from './Button.module.css'

type PropsButton = {
    children: ReactNode
    className?: string;
    onClick?: ( e: MouseEvent ) => void
    disabled?: boolean
    isLoginMode?: boolean
    type?: 'primary' | 'back' | 'small' | 'position'
}

const Button = ( { children, className, onClick, type, disabled }: PropsButton ) => {
    const typeClass = type ? styles[ type ] : '';

    return (
        <button className={ `${ styles.btn } ${ typeClass } ${ className }` }
                onClick={ onClick }
                disabled={ disabled }
        >
            { children }
        </button>
    );
};

export default Button;