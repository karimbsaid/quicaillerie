import { useEffect, useState } from "react";
const BASE_URL = "http://127.0.0.1:8000/api";

export function useProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    async function fetchdata() {
      /* eslint-disable */
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/product`);
        const data = await res.json();
        setProduct(data);
      } catch {
        throw new Error("failed to fetch data ");
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, []);
  return { loading, product, setProduct };
}
