import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userEnd, setUserEnd] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    if (user) {
      if (user.roles.length > 0) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
  }, [user]);

  const getUser = () => {
    setUserLoading(true);
    setUserEnd(false);
    if (token) {
      axios
        .post("https://api.lariran.com/api/v1/auth/me", null, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status === "error") {
            setToken(null);
            localStorage.removeItem("token");
            setUser(null);
          } else {
            setUser(response.data.data);
          }
        })
        .catch((error) => {
          setToken(null);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setUserLoading(false);
          setUserEnd(true);
        });
    } else {
      setUserLoading(false);
      setUserEnd(true);
      setUser(null);
    }
  };

  const setUserHandler = (user) => {
    setUser(user);
  };

  const setTokenHandler = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  const context = {
    token: token,
    setToken: setTokenHandler,
    user: user,
    setUser: setUserHandler,
    loading: userLoading,
    logout: handleLogout,
    end: userEnd,
    admin: admin,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}
