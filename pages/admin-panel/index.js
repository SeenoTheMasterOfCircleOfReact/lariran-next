// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../store/auth-context";
// import { useRouter } from "next/router";

// import classes from "../../styles/AdminPanel/AdminPanel.module.scss";

// export default function AdminPanel() {
//   const authCtx = useContext(AuthContext);
//   const router = useRouter();
//   const [close, setClose] = useState(false);

//   useEffect(() => {
//     if (!localStorage.getItem("token")) router.replace("/admin-login");
//   }, []);

//   function handleToggleClose() {
//     setClose((prev) => !prev);
//   }

//   return <div className={classes.holder}></div>;
// }
