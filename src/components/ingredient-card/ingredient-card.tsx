import styles from "./ingredient-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "../../services/hooks/useSelector";
import {useMemo} from "react";
import {useLocation, Link} from "react-router-dom";
import {TIngredient, TLocation} from "../../utils/types";
import {FC} from "react";

type TProps = {
    ingredient: TIngredient
}

const IngredientCard: FC<TProps> = ({ingredient}) => {
    const constructorData = useSelector(
        (store) => store.burgerConstructor.currentIngredients
    );
    const location = useLocation<TLocation>();

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: {ingredient},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    const counter = useMemo(
        () =>
            (count = 0) => {
                const checkBuns = constructorData.filter(
                    (element) => element.type === "bun"
                );
                const checkFillings = constructorData.filter(
                    (element) => element.type !== "bun"
                );
                if (ingredient.type === "bun" && checkBuns.length !== 0) {
                    count = checkBuns.filter(
                        (element) => element._id === ingredient._id
                    ).length;
                    return count * 2;
                }
                if (ingredient.type !== "bun" && checkFillings.length !== 0) {
                    count = checkFillings.filter(
                        (element) => element._id === ingredient._id
                    ).length;
                    return count;
                }
            },
        [constructorData, ingredient._id, ingredient.type]
    );

    let count = counter();

    return (
        <>
            <Link
                className={styles.card__container}
                ref={dragRef}
                style={{opacity}}
                to={{
                    pathname: `/ingredients/${ingredient._id}`,
                    state: {background: location},
                }}
            >
                {!count ? null : <Counter count={count} size="default"/>}
                <img
                    className={`${styles.card__img} `}
                    src={ingredient.image}
                    alt={ingredient.name}
                />
                <div className={`${styles.card__price_container}`}>
                    <p className={`${styles.card__price} text text_type_digits-default`}>
                        {ingredient.price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <h3 className={`${styles.card__name} text text_type_main-default`}>
                    {ingredient.name}
                </h3>
            </Link>
        </>
    );
}

export default IngredientCard;


