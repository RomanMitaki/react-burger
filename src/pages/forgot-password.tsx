import styles from "./forgot-password.module.css";
import {
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {updatePassword} from "../services/actions/auth";
import {useSelector} from "../services/hooks/useSelector";
import {useDispatch} from "../services/hooks/useDispatch";
import {useForm} from "../services/hooks/useForm";
import {FormEvent} from "react";

export function ForgotPassword() {
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.auth);
    const updatePasswordStatus = useSelector(
        (state) => state.auth.updatePasswordStatus
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updatePassword({email: values.email}));
        setValues({...values, email: ""});
    };

    if (updatePasswordStatus) {
        return <Redirect to="/reset-password"/>;
    }

    if (auth) {
        return <Redirect to="/"/>;
    }

    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <form className={styles.form} method="post" onSubmit={handleSubmit}>
                    <h1 className={`${styles.header}`}>Восстановление пароля</h1>
                    <EmailInput
                        name={"email"}
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                    <Button htmlType="submit">Восстановить</Button>
                </form>
                <p className={`${styles.paragraph} text text_type_main-default`}>
                    Вспомнили пароль?
                    <span>
            <Link to="/login" className={`${styles.link}`}>
              {" "}
                Войти
            </Link>
          </span>
                </p>
            </main>
        </div>
    );
}
