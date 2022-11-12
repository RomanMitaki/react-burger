import styles from "./item-img.module.css";



export default function ItemImg({ingredient}) {


  return (
    <div className={styles.img__border_gradient}>
      <div className={styles.img__container}>
        <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
      </div>
    </div>
  );
}
