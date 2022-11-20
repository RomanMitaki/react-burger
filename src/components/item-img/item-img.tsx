import styles from "./item-img.module.css";
import {FC} from "react";

type TProps = {
    ingredient: {
        _id: string,
        price: number,
        image: string,
        name: string,
        nanoId: string,
        type?: string
    }
}

const ItemImg: FC<TProps> = ({ingredient}) => {
    return (
        <div className={styles.img__border_gradient}>
            <div className={styles.img__container}>
                <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
            </div>
        </div>
    );
}

export default ItemImg;
