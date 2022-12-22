import { useState, useEffect } from "react";
import axios from "axios";

import Title from "../../../../Title/Title";
import { Button } from "@mui/material";

export default function Brands({ selectBrand, selectedBrand, errors }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    onGetBrands();
  }, []);

  function onGetBrands() {
    // setLoading(true);
    // setError(false);
    const url = "https://api.lariran.com/api/v1/brand/all";
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          // Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          // setError(true);
        } else {
          setBrands(response.data.data);
        }
      })
      .catch((error) => {
        // setError(true);
      })
      .finally(() => {
        // setLoading(false);
      });
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title title="انتخاب برند" />
      {Boolean(errors?.brand_id) && (
        <sub style={{ color: "red" }}>{errors?.brand_id?.[0]}</sub>
      )}
      <div style={{ marginBottom: "20px" }}>
        افزودن محصول در برند {selectedBrand?.persian_name}
      </div>
      {brands.map((b) => (
        <div
          key={b.id}
          style={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            border: "1px solid #ccc",
          }}
        >
          <div style={{ flexGrow: "2" }}>{b.persian_name}</div>
          <Button variant="contained" onClick={() => selectBrand(b)}>
            انتخاب
          </Button>
        </div>
      ))}
    </div>
  );
}
