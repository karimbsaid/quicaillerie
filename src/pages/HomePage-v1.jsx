// import { useEffect, useState } from "react";
import Card from "../components/Card";
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import { useProduct } from "../hooks/useProduct";
import { BagProvider, useBag } from "../context/BagContext";
import ShoppingCart from "../components/Cart-shopping";
import { useState } from "react";
// import StyledAsideCart from "../components/Cart-shopping";
// import { CartElement } from "../components/Cart-element";
/*eslint-disable*/
function HomeContent() {
  const { loading, product } = useProduct();
  const { bag } = useBag();
  const [open, setOpen] = useState(false);
  function openBag() {
    setOpen((open) => !open);
  }

  return (
    <>
      {open && <ShoppingCart bagContent={bag} setOpen={openBag} />}
      {loading && <h1>loading</h1>}
      <PageNav openBag={openBag} />
      <div className={styles.productList}>
        {product &&
          product.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              photo={product.photo}
              price={product.price}
            />
          ))}
      </div>
    </>
  );
}
export default function HomePage() {
  return (
    <BagProvider>
      <HomeContent />
    </BagProvider>
  );
}
