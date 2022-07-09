import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

export default function Modal(props) {
  React.useEffect(() => {
    const keyHandler = (evt) => {
      if (evt.key === "Escape") {
        props.onClose();
      }
    };
    if (props.isOpened) {
      document.addEventListener("keydown", keyHandler);
      return () => {
        document.removeEventListener("keydown", keyHandler);
      };
    }
  }, [props.isOpened]);

  if (!props.isOpened) {
    return null;
  }

  return ReactDOM.createPortal(
    <section className={styles.popup}>
      <div className={styles.popup__container}>
        <button className={`${styles.closeBtn}`} onClick={props.onClose}>
          <CloseIcon />
        </button>
        {props.children}
      </div>
      <ModalOverlay onClose={props.onClose} />
    </section>,
    document.getElementById("modals")
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
