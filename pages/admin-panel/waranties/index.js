import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import Waranties from "../../../components/AdminPanel/Pages/Waranties/Waranties";

export default function WarantiesPage() {
  //   const authCtx = useContext(AuthContext);

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [waranties, setWaranties] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  //   useEffect(() => {
  //     onGetWaranties();
  //   }, []);

  //   function onGetWaranties() {
  //     setLoading(true);
  //     setError(false);
  //     const url = `https://api.lariran.com/api/v1/waranty`;
  //     axios
  //       .get(url, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authCtx.token}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.data.status === "error") {
  //           setError(true);
  //         } else {
  //           setWaranties(response.data.data);
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
      {/* <Title title="گارانتی" />
      <Waranties
        waranties={waranties}
        loading={loading}
        error={error}
        getWaranties={onGetWaranties}
        token={authCtx.token}
      /> */}
    </div>
  );
}
