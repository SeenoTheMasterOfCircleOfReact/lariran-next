import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth-context";

export const BasketContext = createContext();

export default function BasketContextProvider(props) {
  const authCtx = useContext(AuthContext);
  const [basket, setBasket] = useState(null);
  const [basketLoading, setBasketLoading] = useState(false);
  const [error, setError] = useState(false);

  const getBasket = (updating) => {
    !updating && setBasketLoading(true);
    setError(false);
    axios
      .get("https://api.lariran.com/api/v1/basket", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
        } else {
          setBasket(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setBasketLoading(false);
      });
  };

  const context = {
    basket: basket,
    getBasket: getBasket,
    loading: basketLoading,
    error: error,
  };

  return (
    <BasketContext.Provider value={context}>
      {props.children}
    </BasketContext.Provider>
  );
}
