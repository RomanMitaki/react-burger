import {useDispatch} from "../services/hooks/useDispatch";
import {useSelector} from "../services/hooks/useSelector";
import styles from "./register.module.css";
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {regSignIn} from "../services/actions/auth";
import {useForm} from "../services/hooks/useForm";
import {FormEvent} from "react";

export function Register() {
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.auth);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(regSignIn({name: values.name, email: values.email, password: values.password}));
        setValues({...values, email: "", password: "", name: ""});
    };

    if (auth) {
        return <Redirect to="/"/>;
    }

    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <form className={styles.form} method="post" onSubmit={handleSubmit}>
                    <h1 className={`${styles.header}`}>Регистрация</h1>
                    <Input
                        placeholder={"Имя"}
                        value={values.name || ""}
                        type={"text"}
                        name={"name"}
                        onChange={handleChange}
                    />
                    <EmailInput
                        name={"email"}
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        value={values.password || ""}
                        name={"password"}
                        onChange={handleChange}
                    />
                    <Button htmlType="submit">Зарегистрироваться</Button>
                </form>
                <p className={`${styles.paragraph} text text_type_main-default`}>
                    Уже зарегистрированы?
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
