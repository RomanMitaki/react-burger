import styles from "./orders-feed.module.css";
import {useSelector} from "../../services/hooks/useSelector";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";
import {FC} from "react";


type TProps = {
    display: string,
    status: string
}

const OrdersFeed: FC<TProps> = ({display, status}) => {
    const orders = useSelector((store) => store.wsOrders.orders);


    if (!orders) {
        return null;
    }

    return (
        <section className={`${styles.section} mt-10`}>
            <h1 className="text text_type_main-large" style={{display: `${display}`}}>Лента заказов</h1>
            <ul className={`${styles.feeditems__container}`}>
                {orders.map((order) => (
                    <li key={order._id}>
                        <OrdersFeedItem order={order} display={status}/>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default OrdersFeed;