import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { useRouter } from "next/router";
import Currency from "../../../components/AdminPanel/Pages/Currency/Currency";

export default function CurrencyPage() {
  const authCtx = useContext(AuthContext);
  const { query } = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    onGetCurrencies();
  }, []);

  function onGetCurrencies() {
    setLoading(true);
    setError(false);
    const url = `https://api.lariran.com/api/v1/currency?page=${query.page}`;
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
        } else {
          setCurrencies(response.data.data);
          setPageCount(response.data.meta.last_page);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={classes.holder}>
      <Title title="واحد پول" />
      {/* {!loading && <PaginationHolder count={pageCount} />} */}
      <Currency
        currencies={currencies}
        loading={loading}
        error={error}
        getCurrencies={onGetCurrencies}
        token={authCtx.token}
        pageCount={pageCount}
      />
      {/* {!loading && <PaginationHolder count={pageCount} />} */}
    </div>
  );
}
