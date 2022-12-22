import classes from "./Title.module.scss";

export default function Title({ title }) {
  return <h2 className={classes.title}>{title}</h2>;
}
