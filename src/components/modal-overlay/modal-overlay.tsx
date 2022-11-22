import React from "react";
import styles from "./modal-overlay.module.css";
import {FC} from "react";

type TProps = {
    onClose: () => void,
}

const ModalOverlay: FC<TProps> = ({onClose}) => {
    return <div className={styles.modal__overlay} onClick={onClose}></div>;
}

export default ModalOverlay;


