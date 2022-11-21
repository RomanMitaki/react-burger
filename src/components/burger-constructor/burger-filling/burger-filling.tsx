import styles from "./burger-filling.module.css";
import {
    DragIcon,
    ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";
import {useDispatch} from "../../../services/hooks/useDispatch";
import {swapFillings} from "../../../services/actions/burger-constructor";
import {FC} from "react";
import {TIngredient} from "../../../utils/types";

type TProps = {
    ingredient: TIngredient,
    deleteHandler: () => void,
    index: number,
}

const BurgerFilling: FC<TProps> = ({ingredient, deleteHandler, index}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);


    const [, drop] = useDrop({
        accept: "ingredientConstructor",
        drop(item: TIngredient) {
            if (item.index === index) {
                return;
            }
            item.index && dispatch(swapFillings(item.index, index, item))
        },

    });

    const [{opacity}, drag] = useDrag({
        type: "ingredientConstructor",
        item: {...ingredient, index},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    drag(drop(ref));

    return (
        <li
            className={`${styles.constructorEl} mb-4`}
            ref={ref}
            style={{opacity}}
        >
            <button className={styles.constructor__dragBtn}>
                <DragIcon type="primary"/>
            </button>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={deleteHandler}
            />
        </li>
    );
}

export default BurgerFilling;


