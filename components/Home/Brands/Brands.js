import classes from "../../../styles/Home/brands.module.scss";

import BrandsHolder from "./BrandsHolder/BrandsHolder";

export default function Brands({ brands }) {
  return (
    <div className={classes.brands}>
      <h2 className={classes.title}>برند ها</h2>
      <BrandsHolder brands={brands} />
    </div>
  );
}
