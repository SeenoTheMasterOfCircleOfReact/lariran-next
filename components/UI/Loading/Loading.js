import Image from "next/image";
import classes from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={classes.holder}>
      <div className={classes.wrapper}></div>
      <div className={classes.loading}>
        <span>LAR</span>
        <span>IRAN</span>
      </div>
    </div>
  );
}
