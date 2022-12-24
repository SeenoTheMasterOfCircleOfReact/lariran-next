import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";

import Title from "../../../components/AdminPanel/Title/Title";

import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
import { useRouter } from "next/router";
import Options from "../../../components/AdminPanel/Pages/Options/Options";

export default function OptionsPage() {
  //   const authCtx = useContext(AuthContext);
  //   const router = useRouter();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [options, setOptions] = useState([]);
  //   const [pageCount, setPageCount] = useState(1);

  //   useEffect(() => {
  //     onGetOptions();
  //   }, []);

  //   function onGetOptions() {
  //     setLoading(true);
  //     setError(false);
  //     const url = `https://api.lariran.com/api/v1/option`;
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
  //           setOptions(response.data.data);
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
      {/* <Title title="آپشن ها" />
      <Options
        options={options}
        loading={loading}
        error={error}
        getOptions={onGetOptions}
        token={authCtx.token}
      /> */}
    </div>
  );
}
