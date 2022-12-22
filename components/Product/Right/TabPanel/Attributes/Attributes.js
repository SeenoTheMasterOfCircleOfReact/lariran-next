import classes from "./attributes.module.scss";

export default function Attributes({ attributes }) {
  return (
    <div className={classes.attributes}>
      {attributes?.map((attribute) => (
        <div key={attribute.id} className={classes.attribute}>
          <div className={classes.key}>{attribute?.attribute?.data?.name}</div>
          <div className={classes.value}>{attribute?.value}</div>
        </div>
      ))}
    </div>
  );
}
