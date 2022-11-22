import styles from "./order-id-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";

type TProps = {
    ingredient: {
        _id: string,
        price: number,
        image: string,
        name: string,
        nanoId: string,
        quantity: number
    }
};

const OrderIdFeedItem: FC<TProps> = ({ingredient}) => {


    return (
        <div className={styles.orderIdFeedItem__container}>
            <ItemImg ingredient={ingredient}/>
            <div className={styles.orderIdFeedItem__info_container}>
                <p
                    className={`${styles.orderIdFeedItem__text} text text_type_main-small`}
                >
                    {ingredient?.name}
                </p>
                <div>
                    <div className={`${styles.orderIdFeedItem__price_container}`}>
                        <p
                            className={`${styles.orderIdFeedItem__price} text text_type_digits-default`}
                        >
                            {`${ingredient?.quantity} x ${ingredient?.price}`}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderIdFeedItem;