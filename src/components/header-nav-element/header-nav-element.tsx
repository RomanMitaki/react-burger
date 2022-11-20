import React from "react";
import styles from "./header-nav-element.module.css";
import {NavLink} from "react-router-dom";
import {FC} from "react";

type TProps = {
    text: string;
    typography: string,
    href: string,
    children: React.ReactNode
}

const HeaderNavElement: FC<TProps> = ({text, typography, href, children}) => {
    return (
        <li className={`${styles.element} pl-5 pr-5 pb-4 pt-4 mr-2`}>
            <NavLink to={href} exact className={`${styles.link}`} activeClassName={styles.link__active}>
                {children}
                <p className={`${styles.link__text} ${typography} pl-2`}>{text}</p>
            </NavLink>
        </li>
    );
}

export default HeaderNavElement;


