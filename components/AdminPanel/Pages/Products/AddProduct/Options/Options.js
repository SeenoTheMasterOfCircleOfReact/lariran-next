import { useState, useEffect } from "react";
import axios from "axios";

import Title from "../../../../Title/Title";
import { Button } from "@mui/material";

export default function Options({
  selectOption,
  selectedOption,
  token,
  errors,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    onGetOptions();
  }, []);

  function onGetOptions() {
    // setLoading(true);
    // setError(false);
    const url = "https://api.lariran.com/api/v1/option";
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          // setError(true);
        } else {
          setOptions(response.data.data);
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
      <Title title="انتخاب آپشن" />
      {Boolean(errors?.option_id) && (
        <sub style={{ color: "red" }}>{errors?.option_id?.[0]}</sub>
      )}
      <div style={{ marginBottom: "20px" }}>
        افزودن محصول با آپشن {selectedOption?.name}
      </div>
      {options.map((b) => (
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
          <div style={{ flexGrow: "2" }}>{b.name}</div>
          <Button variant="contained" onClick={() => selectOption(b)}>
            انتخاب
          </Button>
        </div>
      ))}
    </div>
  );
}
