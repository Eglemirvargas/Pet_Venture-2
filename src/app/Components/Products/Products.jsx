import React, { useEffect, useState } from "react";
import Navbar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/actions";
import Card from "../Card/Card";
import styles from "./Products.module.css";

export default function Products(props) {
  const allProducts = useSelector((state) => state.products);

  //& Manejo de error por falta de resultados
  if (allProducts.length === 0)
    return (
      <div className={styles.container}>
        {" "}
        <h1 className={styles.notFound}>
          No se encontraron resultados - Resetear filtros, por favor.{" "}
        </h1>
      </div>
    );

  return (
    <div className={styles.productos}>
      {props.itemsToShow.map((p, i) => (
        <Card
          key={p.i}
          image={p.image}
          name={p.name}
          category={p.category}
          subCategory={p.subCategory}
          brand_URL={p.brand_URL}
          image_URL={p.image_URL}
          price={p.price}
          brand={p.brand}
          id={p.id}
        />
      ))}
    </div>
  );
}
