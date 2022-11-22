import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {FC} from "react";

type TProps = {
    onClose: () => void,
    isOpened: boolean,
    children: React.ReactNode
}

const Modal: FC<TProps> = ({onClose, isOpened, children}) => {
    React.useEffect(() => {
        const keyHandler = (evt: { key: string }) => {
            if (evt.key === "Escape") {
                onClose();
            }
        };
        if (isOpened) {
            document.addEventListener("keydown", keyHandler);
            return () => {
                document.removeEventListener("keydown", keyHandler);
            };
        }
    }, [isOpened, onClose]);

    if (!isOpened) {
        return null;
    }

    return ReactDOM.createPortal(
        <section className={styles.popup}>
            <div className={styles.popup__container}>
                <button className={`${styles.closeBtn}`} onClick={onClose}>
                    <CloseIcon type='primary'/>
                </button>
                {children}
            </div>
            <ModalOverlay onClose={onClose}/>
        </section>,
        document.getElementById("modals") as HTMLElement
    );
}

export default Modal;


