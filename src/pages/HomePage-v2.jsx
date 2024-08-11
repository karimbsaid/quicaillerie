import { useEffect, useState } from "react";
import Card from "../components/Card";
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import { getProduct } from "../services/apiProduct";
import { BagProvider, useBag } from "../context/BagContext";
import ShoppingCart from "../components/Cart-shopping";
import Pagination from "../components/Pagination";
import GlobalStyles from "../styles/GlobalStyles";

function HomeContent() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { bag } = useBag();
  const [open, setOpen] = useState(false);

  function openBag() {
    setOpen((open) => !open);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getProduct({ category: "all", search: "", page });
        setProduct(data.results);
        setTotalPages(data.total_pages);
        setTotalCount(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  function handlePageChange(newPage) {
    setPage(newPage);
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
        perPage={10} // This should match your page size
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <BagProvider>
      <GlobalStyles />
      <HomeContent />
    </BagProvider>
  );
}
