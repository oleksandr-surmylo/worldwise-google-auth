import React, { ReactNode } from 'react';

type PropsType = {
    children: ReactNode;
}

const Toast = ( { children }: PropsType ) => {
    return (
        <div>{ children }</div>
    );
};

export default Toast;