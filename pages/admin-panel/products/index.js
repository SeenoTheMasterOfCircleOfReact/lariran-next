import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { useRouter } from "next/router";
import ProductsHolder from "../../../components/AdminPanel/Pages/Products/Products";
import PaginationHolder from "../../../components/AdminPanel/Pagination/Pagination";

export default function Products() {
  //   const authCtx = useContext(AuthContext);
  //   const router = useRouter();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [products, setProducts] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  //   useEffect(() => {
  //     onGetProducts();
  //   }, []);

  //   function onGetProducts() {
  //     setLoading(true);
  //     setError(false);
  //     const url = `https://api.lariran.com/api/v1/product?page=${router.query.page}`;

  //     axios
  //       .get(url, {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         if (response.data.status === "error") {
  //           setError(true);
  //         } else {
  //           setProducts(response.data.data);
  //           setPageCount(response.data.meta.last_page);
  //         }
  //       })
  //       .catch((error) => {
  //         setError(true);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }

  return (
    <div className={classes.holder}>
      {/* <Title title="محصولات" />
      {!loading && <PaginationHolder count={pageCount} />}
      <ProductsHolder
        products={products}
        loading={loading}
        error={error}
        getProducts={onGetProducts}
      />
      {!loading && <PaginationHolder count={pageCount} />} */}
    </div>
  );
}
