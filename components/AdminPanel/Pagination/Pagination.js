import React from "react";
import { useRouter } from "next/router";

import Pagination from "@mui/material/Pagination";

export default function PaginationHolder({ count }) {
  const router = useRouter();

  const handleChange = (event, value) => {
    console.log(router.pathname);
    router.push(
      {
        pathname: router.pathname,
        query: {
          page: value,
        },
      },
      `${router.pathname}?page=${value}`,
      { shallow: true }
    );
  };

  return (
    <Pagination
      color="primary"
      count={count}
      onChange={handleChange}
      page={+router.query.page}
      style={{
        margin: "10px auto",
        display: "block",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
