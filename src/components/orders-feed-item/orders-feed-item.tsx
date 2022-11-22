import styles from "./orders-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useRouteMatch} from "react-router-dom";
import {useSelector} from "../../services/hooks/useSelector";
import {nanoid} from "nanoid";
import {useMemo} from "react";
import {formatDate} from "../../utils/format-date";
import {formatOrderStatus} from "../../utils/format-order-status";
import {TLocation} from "../../utils/types";
import {FC} from "react";

type TProps = {
    order: {
        ingredients: string[],
        _id: string,
        status: string,
        number: number,
        createdAt: string,
        updatedAt: string,
        name: string
    },
    display: string
}

const OrdersFeedItem: FC<TProps> = ({order, display}) => {
    const location = useLocation<TLocation>();
    const ingredients = useSelector(
        (store) => store.burgerIngredients.ingredients
    );
    const {url} = useRouteMatch();

//создаем массив ингредиентов конкретного заказа для дальнейшей отрисовки изображений
    type TSelectedIngredients = {
        _id: string,
        price: number,
        image: string,
        name: string,
        nanoId: string,
        type: string
    }[];

    const selectedIngredients: TSelectedIngredients = order.ingredients.reduce((acc, ingredient) => {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i]._id === ingredient) {
                const uniqueId = nanoid();

                acc?.push({
                    _id: ingredients[i]._id,
                    price: ingredients[i].price,
                    image: ingredients[i].image,
                    name: ingredients[i].name,
                    type: ingredients[i].type,
                    nanoId: uniqueId,
                });
            }
        }
        return acc;
    }, [] as TSelectedIngredients);

    const totalPrice = useMemo(() => {
        return selectedIngredients?.reduce((acc, element) => {
            acc += element.price;
            return acc;
        }, 0);
    }, [selectedIngredients]);

    return (
        <Link
            to={{pathname: `${url}/${order._id}`, state: {background: location}}}
            className={styles.container}
        >
            <div
                className={`${styles.item__container} ${styles.item__container_upper}`}
            >
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <p className={`${styles.item__date} text text_type_main-default`}>
                    {`${formatDate(order.updatedAt)}`}
                </p>
            </div>
            <h2 className="text text_type_main-medium">{`${order.name}`}</h2>
            <p
                className={`${styles.item__status} text text_type_main-default`}
                style={{display: `${display}`}}
            >
                {`${formatOrderStatus(order.status)}`}
            </p>
            <div
                className={`${styles.item__container} ${styles.item__container_bottom}`}
            >
                <div className={styles.item__imgContainer}>
                    <ul className={styles.img__list}>
                        {selectedIngredients?.map((ingredient) => (
                            <li key={ingredient.nanoId}>
                                <ItemImg ingredient={ingredient}/>
                            </li>
                        ))}
                    </ul>
                    {selectedIngredients && selectedIngredients.length > 6 && (
                        <p className={`${styles.img__counter} text text_type_main-small`}>
                            {`+${selectedIngredients.length - 6}`}
                        </p>
                    )}
                </div>
                <div className={`${styles.item__price_container}`}>
                    <p className={`${styles.item__price} text text_type_digits-default`}>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </Link>
    );

}
export default OrdersFeedItem;