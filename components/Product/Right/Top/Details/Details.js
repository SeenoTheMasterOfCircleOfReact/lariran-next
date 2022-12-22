import React from "react";
import Brand from "./Brand/Brand";
import Title from "./Title/Title";

import classes from "./details.module.scss";
import OptionSection from "./OptionSection/OptionSection";

export default function Details({
  product,
  varieties,
  variety,
  selectVariety,
}) {
  return (
    <div className={classes.holder}>
      <Brand brand={product?.brand_id} />
      <Title title={product?.title} persianTitle={product?.persian_title} />
      <OptionSection
        option={product?.option_id}
        varieties={varieties}
        variety={variety}
        selectVariety={selectVariety}
      />
    </div>
  );
}
