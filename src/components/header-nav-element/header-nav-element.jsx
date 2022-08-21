import React from "react";
import styles from "./header-nav-element.module.css";
import { NavLink } from "react-router-dom";


export default function HeaderNavElement(props) {
  return (
    <li className={`${styles.element} pl-5 pr-5 pb-4 pt-4 mr-2`}>
      <NavLink to={props.href} exact className={`${styles.link}`} activeClassName={styles.link__active}>
        {props.children}
        <p className={`${styles.link__text} ${props.typography} pl-2`}>{props.text}</p>
      </NavLink>
    </li>
  );
}


