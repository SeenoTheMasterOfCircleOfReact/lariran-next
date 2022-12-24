// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { AuthContext } from "../../../store/auth-context";

// import Title from "../../../components/AdminPanel/Title/Title";
// import Comments from "../../../components/AdminPanel/Pages/Comments/Comments";

// import classes from "../../../styles/AdminPanel/Products/Products.module.scss";
// import { LinearProgress } from "@mui/material";

// export default function CommentsPage() {
//   const authCtx = useContext(AuthContext);
//   const { query } = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [pageCount, setPageCount] = useState(1);

//   useEffect(() => {
//     onGetComments();
//   }, []);

//   function onGetComments() {
//     setLoading(true);
//     setError(false);
//     const url = `https://api.lariran.com/api/v1/comment?page=${query.page}`;
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
//           setComments(response.data.data);
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
//         <Title title="نظرات" />

//         <Comments
//           comments={comments}
//           loading={loading}
//           error={error}
//           getComments={onGetComments}
//           token={authCtx.token}
//           pageCount={pageCount}
//         />
//       </div>
//     </>
//   );
// }
