import classes from "./description.module.scss";

export default function Description({ description }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className={classes.description}
    ></div>
  );
}
