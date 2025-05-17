import { ReactNode, MouseEvent } from 'react';
import styles from './Button.module.css'

type PropsButton = {
    children: ReactNode
    onClick?: ( e: MouseEvent ) => void
    disabled?: boolean
    isLoginMode?: boolean
    type?: 'primary' | 'back' | 'small' | 'position'
}

const Button = ( { children, onClick, type, disabled }: PropsButton ) => {
    const typeClass = type ? styles[ type ] : '';

    return (
        <button className={ `${ styles.btn } ${ typeClass }` }
                onClick={ onClick }
                disabled={ disabled }>
            { children }
        </button>
    );
};

export default Button;