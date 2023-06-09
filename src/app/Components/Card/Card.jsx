import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import { addCarrito, deleteCarrito } from "../../../../redux/actions"
import { useDispatch } from "react-redux";

function Card(props) {

  const dispatch = useDispatch()

  const handlerClick = (id) => {
    dispatch(addCarrito(id));
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.carrito}>
         <button onClick={handlerClick(props.id)}>
              <p className={styles.button}>Añadir al Carrito</p>
          </button>
      </div>
      <div className={styles.card}>
        <img className={styles.img} src={props.image} alt="Not found" />
        <div className={styles.productInfo}>
          <div>
            <h5 className={styles.title}>{props.name}</h5>
          </div>
          <div>
            <h5 className={styles.title}>Marca: {props.brand}</h5>
          </div>
          <div>
            <h5 className={styles.title}>Precio: $ {props.price}</h5>
          </div>
          <div className={styles.buttonContainer}>
            <Link href={`/detail/${props.id}`}>
              <p className={styles.button}>Detalle</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
