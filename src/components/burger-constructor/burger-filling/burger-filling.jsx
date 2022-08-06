import styles from "./burger-filling.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { swapFillings } from "../../../services/actions/burger-constructor";


export default function BurgerFilling({ ingredient, deleteHandler, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);


  const [, drop] = useDrop({
    accept: "ingredient",
    hover(ingredient) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      dispatch(swapFillings(dragIndex, hoverIndex, ingredient));
      ingredient.index = hoverIndex;
    },
    
  });

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { ...ingredient, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles.constructorEl} mb-4`}
      ref={ref}
      style={{ opacity }}
    >
      <button className={styles.constructor__dragBtn}>
        <DragIcon type="primary" />
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

BurgerFilling.propTypes = {
  ingredient: ingredientType.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};
