import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

export default function Modal(props) {
  const keyHandler = (evt) => {
    if (evt.key === "Escape") {
      props.onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  });

  if (!props.isOpened) {
    return null;
  }

  return ReactDOM.createPortal((
    <section className={styles.popup}>
      <div className={styles.popup__container}>
        ddddddddd<button
          className={`${styles.closeBtn}`}
          onClick={props.onClose}
        >
          <CloseIcon />
        </button>
        {props.children}
      </div>
      <ModalOverlay closeModalWindow={props.onClose} />
    </section>),
    document.body
  );
}
