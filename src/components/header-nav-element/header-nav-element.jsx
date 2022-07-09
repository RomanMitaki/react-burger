import React from "react";
import styles from "./header-nav-element.module.css";


export default function HeaderNavElement(props) {
  return (
    <li className={`${styles.element} pl-5 pr-5 pb-4 pt-4 mr-2`}>
      <a href={props.href} className={`${styles.link}`}>
        {props.children}
        <p className={`${styles.link__text} ${props.typography} pl-2`}>{props.text}</p>
      </a>
    </li>
  );
}


