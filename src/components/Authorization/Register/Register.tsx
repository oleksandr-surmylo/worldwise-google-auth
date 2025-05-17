import React from 'react';
import styles from "../../AuthForm/AuthForm.module.css";
import PageNav from "../../PageNav/PageNav";
import AuthForm from "../../AuthForm/AuthForm";

const Register = () => {
    return (
        <main className={ styles.login }>
            <PageNav/>
            <AuthForm/>
        </main>
    );
};

export default Register;