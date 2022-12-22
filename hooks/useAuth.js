import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../store/auth-context";

export function useCheckAuth() {
  const authCtx = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (authCtx.token) setAuth(true);
    else setAuth(false);
  }, [authCtx.token]);

  return auth;
}

export function useGetUser() {
  const authCtx = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (authCtx.token) setAuth(true);
    else setAuth(false);
  }, [authCtx.token]);

  return auth;
}
