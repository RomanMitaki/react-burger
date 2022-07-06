import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
  return (
    <div className={styles.modal__overlay} onClick={props.onClose}></div>
  );
}
