import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PaginationHolder from "../../Pagination/Pagination";
import OrdersHolder from "./OrdersHolder/OrdersHolder";
import AlertBg from "../../../UI/AlertBg/AlertBg";

import classes from "./Orders.module.scss";
import { AppBar, Button, MenuItem, TextField, Toolbar } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function Orders({
  orders,
  loading,
  error,
  getOrders,
  token,
  pageCount,
}) {
  const { query } = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("200");
  const [date, setDate] = useState(null);
  const [fromEn, setFromEn] = useState(null);
  const [toEn, setToEn] = useState(null);

  // let from = date?.[0]?.toDate?.();
  // let to = date?.[1]?.toDate?.();
  // const dateFrom = new DateObject({
  //   date: from,
  //   format: "YYYY/MM/DD",
  //   calendar: persian,
  //   locale: persian_fa,
  // });
  // const dateTo = new DateObject({
  //   date: to,
  //   format: "YYYY/MM/DD",
  //   calendar: persian,
  //   locale: persian_fa,
  // });

  // useEffect(() => {
  //   const fromEnFormatter = new DateObject({
  //     date: from,
  //     format: "YYYY/MM/DD",
  //   });
  //   const toEnFormatter = new DateObject({
  //     date: to,
  //     format: "YYYY/MM/DD",
  //   });

  //   if (date) {
  //     setFromEn(fromEnFormatter.format());
  //     setToEn(toEnFormatter.format());
  //   } else {
  //     setFromEn(null);
  //     setToEn(null);
  //   }
  // }, [date]);

  // useEffect(() => {
  //   getOrders(search, status, fromEn, toEn);
  // }, [query.page]);

  // useEffect(() => {
  //   console.log(status);
  // }, []);

  // let dateValue = "انتخاب بازه زمانی";
  // if (date) {
  //   dateValue = dateFrom.format() + " ~ " + dateTo.format();
  // }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleStatusChange(e) {
    setStatus(e.target.value);
  }

  // date picker
  const clearDatePickerHandle = () => {
    setDate(null);
  };

  if (error) {
    return (
      <div className="admin-panel-error">
        <AlertBg
          refresh
          onRefresh={() => getOrders()}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  return (
    <div className={classes.holder}>
      {/* <div style={{ color: "red", marginBottom: "10px" }}>{errors}</div> */}

      <div className={classes.TableHolder}>
        <PaginationHolder count={pageCount} />
        <OrdersHolder
          orders={orders}
          loading={loading}
          error={error}
          getOrders={getOrders}
          token={token}
          status={status}
          search={search}
          from={fromEn}
          to={toEn}
        />
        <PaginationHolder count={pageCount} />
      </div>
    </div>
  );
}
