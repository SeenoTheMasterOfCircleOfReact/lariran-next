import Image from "next/image";

import classes from "../../../../../styles/Home/brand.module.scss";

export default function Brand({ brand }) {
  return (
    <div className={classes.brand}>
      <div className={classes.holder}>
        <Image
          src={`https://api.lariran.com${brand.brand.image}`}
          alt={brand.brand.persian_name}
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
