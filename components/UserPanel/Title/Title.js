import useWindowDimensions from "../../../hooks/useWindowDimensions";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import classes from "./Title.module.scss";
import Link from "next/link";

export default function Title({ title }) {
  const { height, width } = useWindowDimensions();

  return (
    <div className={classes.holder}>
      <h1 className={classes.title}>{title}</h1>
      {width < 1000 && (
        <Link href="/user-panel">
          <ArrowBackIosNewRoundedIcon />
        </Link>
      )}
    </div>
  );
}
