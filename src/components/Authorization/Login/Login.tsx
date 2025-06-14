
import styles from "../../AuthForm/AuthForm.module.css";
import PageNav from "../../PageNav/PageNav";
import AuthForm from "../../AuthForm/AuthForm";

const Login = () => {
    return (
        <main className={ styles.login }>
            <PageNav/>
            <AuthForm/>
        </main>
    );

}
export default Login;