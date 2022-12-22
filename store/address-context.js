import { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth-context";

export const AddressContext = createContext();

export default function AddressContextProvider(props) {
  const authCtx = useContext(AuthContext);
  const [getAddressLoading, setGetAddressLoading] = useState(false);
  const [postAddressLoading, setPostAddressLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [getAddressError, setGetAddressError] = useState(false);
  const [postAddressError, setPostAddressError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [finish, setFinish] = useState(false);

  const token = authCtx.token;

  function getAddress() {
    setGetAddressLoading(true);
    setGetAddressError(false);
    setFinish(false);

    axios
      .get("https://api.lariran.com/api/v1/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setGetAddressError(true);
        } else {
          setAddresses(response.data.data);
        }
      })
      .catch((error) => {
        setGetAddressError(true);
      })
      .finally(() => {
        setGetAddressLoading(false);
        setFinish(true);
      });
  }

  function postAddress(address, zipCode, city) {
    setPostAddressLoading(true);
    setSuccess(false);
    setPostAddressError(false);
    axios
      .post("https://api.lariran.com/api/v1/address/create", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          address: address,
          postal_code: zipCode,
          city_id: city,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setPostAddressError(true);
          const errors = Object.keys(response.data.data).map((key) => {
            const newObj = {
              key: key,
              error: response.data.data[key],
            };
            return newObj;
          });
          setErrors(errors);
        } else {
          setSuccess(true);
          getAddress();
        }
      })
      .catch((error) => {
        setPostAddressError(true);
        setErrors([{ key: "server", error: error.message }]);
      })
      .finally(() => {
        setPostAddressLoading(false);
      });
  }

  function updateSuccess(success) {
    setSuccess(success);
  }

  const context = {
    addresses: addresses,
    getAddress: getAddress,
    getAddressLoading: getAddressLoading,
    getAddressError: getAddressError,

    postAddress: postAddress,
    postAddressLoading: postAddressLoading,
    postAddressError: postAddressError,

    success: success,
    errors: errors,
    finish: finish,

    updateSuccess: updateSuccess,
  };

  return (
    <AddressContext.Provider value={context}>
      {props.children}
    </AddressContext.Provider>
  );
}
