// import { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { AuthContext } from "../../../store/auth-context";

// import Title from "../../../components/AdminPanel/Title/Title";
// import SearchBar from "../../../components/AdminPanel/Pages/Orders/SearchBar/SearchBar";
// import Orders from "../../../components/AdminPanel/Pages/Orders/Orders";

// import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
// import { LinearProgress } from "@mui/material";

// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// export default function OrdersPage() {
//   const authCtx = useContext(AuthContext);
//   const { query } = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [pageCount, setPageCount] = useState(1);

//   const [search, setSearch] = useState(null);
//   const [status, setStatus] = useState("200");
//   const [date, setDate] = useState(null);
//   const [fromEn, setFromEn] = useState(null);
//   const [toEn, setToEn] = useState(null);

//   let from = date?.[0]?.toDate?.();
//   let to = date?.[1]?.toDate?.();
//   const dateFrom = new DateObject({
//     date: from,
//     format: "YYYY/MM/DD",
//     calendar: persian,
//     locale: persian_fa,
//   });
//   const dateTo = new DateObject({
//     date: to,
//     format: "YYYY/MM/DD",
//     calendar: persian,
//     locale: persian_fa,
//   });

//   useEffect(() => {
//     const fromEnFormatter = new DateObject({
//       date: from,
//       format: "YYYY/MM/DD",
//     });
//     const toEnFormatter = new DateObject({
//       date: to,
//       format: "YYYY/MM/DD",
//     });

//     if (date) {
//       setFromEn(fromEnFormatter.format());
//       setToEn(toEnFormatter.format());
//     } else {
//       setFromEn(null);
//       setToEn(null);
//     }
//   }, [date]);

//   useEffect(() => {
//     onGetOrders();
//   }, []);

//   function handleSearchChange(e) {
//     setSearch(e.target.value);
//   }
//   function handleStatusChange(e) {
//     setStatus(e.target.value);
//   }
//   function handleDateChange(d) {
//     setDate(d);
//   }
//   // date picker
//   const clearDatePickerHandle = () => {
//     setDate(null);
//   };

//   function onGetOrders() {
//     setLoading(true);
//     setError(false);
//     const url = `https://api.lariran.com/api/v1/orders?page=${query.page}`;
//     axios
//       .post(url, null, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${authCtx.token}`,
//         },
//         params: {
//           s: search,
//           status: status === "200" ? null : status,
//           from: fromEn,
//           to: toEn,
//         },
//       })
//       .then((response) => {
//         if (response.data.status === "error") {
//           setError(true);
//         } else {
//           setOrders(response.data.data);
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

//   return (
//     <>
//       {loading && <LinearProgress />}
//       <div className={classes.holder}>
//         <Title title="سفارشات" />
//         <SearchBar
//           search={search}
//           searchChange={handleSearchChange}
//           status={status}
//           statusChange={handleStatusChange}
//           date={date}
//           dateChange={handleDateChange}
//           clearDate={clearDatePickerHandle}
//           dateTo={dateTo}
//           dateFrom={dateFrom}
//           getOrders={onGetOrders}
//         />
//         <Orders
//           orders={orders}
//           loading={loading}
//           error={error}
//           getOrders={onGetOrders}
//           token={authCtx.token}
//           pageCount={pageCount}
//         />
//       </div>
//     </>
//   );
// }
