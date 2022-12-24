import { useState } from "react";

import classes from "../.././styles/Brands/Brands.module.scss";
import Brand from "../../components/Brands/Brand/Brand";

export default function BrandsPage({ brands }) {
  return (
    <div className={classes.holder}>
      {brands.map((brand) => (
        <Brand key={brand.id} brand={brand} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const baseUrl = "https://api.lariran.com/api/v1/";

  const brandsResponse = fetch(`${baseUrl}brand/all`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
  let brandsData;

  try {
    await brandsResponse;
    brandsData = await brandsResponse;
  } catch (e) {
    brandsData = {
      data: [],
    };
  } finally {
  }

  return {
    props: {
      brands: brandsData.data,
    },
  };
}
