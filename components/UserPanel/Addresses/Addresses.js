import { useState, useEffect } from "react";
import axios from "axios";

import Title from "../Title/Title";
import AddressHolder from "./AddressHolder/AddressHolder";

import classes from "./Addresses.module.scss";

export default function Addresses({ token }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = () => {
    setLoading(true);
    setError(false);
    setErrors([]);

    axios
      .get("https://api.lariran.com/api/v1/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setErrors(errors);
        } else {
          setAddresses(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
        setErrors([error.message]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={classes.Addresses}>
      <Title title="آدرس ها" />
      <AddressHolder
        addresses={addresses}
        token={token}
        getAddresses={getAddresses}
        loadingAll={loading}
        errorAll={error}
      />
    </div>
  );
}
