import { useState, useEffect } from "react";

import Left from "../../../components/Product/Left/Left";
import Right from "../../../components/Product/Right/Right";

import classes from "../../../styles/Product/product.module.scss";

export default function Product({ product, related }) {
  const [variety, setVariety] = useState(null);
  const [onStockVarieties, setOnStockVarieties] = useState([]);

  useEffect(() => {
    setVariety(product?.varieties?.find((v) => +v.stock > 0));
    setOnStockVarieties(product?.varieties?.filter((v) => +v.stock > 0));
  }, [product]);

  const selectVarietyHandle = (v) => {
    setVariety(v);
  };

  return (
    <div className={classes.holder}>
      <Right
        product={product}
        related={related}
        varieties={onStockVarieties}
        variety={variety}
        selectVariety={selectVarietyHandle}
      />
      <Left product={product} variety={variety} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const baseUrl = "https://api.lariran.com/api/v1/";

  let productError = false;
  let productLoading = true;
  const productResponse = fetch(`${baseUrl}product/${params.slug[0]}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      productLoading = false;
      return json;
    });
  let productData;

  console.log(productResponse);

  try {
    productLoading = true;

    await productResponse;
    productData = await productResponse;
  } catch (e) {
  } finally {
  }

  // const productResponse = await fetch(`${baseUrl}product/${params.slug[0]}`);
  // const productData = await productResponse?.json();

  const relatedResponse = await fetch(
    `${baseUrl}product/${params.slug[0]}/relateds`
  );
  const relatedData = await relatedResponse?.json();

  return {
    // props: {
    //   product: productData.data,
    //   related: relatedData.data,
    // },
    props: {
      product: productData.data,
      related: relatedData.data,
    },
  };
}
