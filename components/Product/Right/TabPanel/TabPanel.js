import Attributes from "./Attributes/Attributes";
import Description from "./Description/Description";
import classes from "./tabPanel.module.scss";

export default function TabPanel({ tab, attributes, description }) {
  return (
    <div className={classes.tabPanel}>
      {tab === 0 && <Attributes attributes={attributes} />}
      {tab === 1 && <Description description={description} />}
    </div>
  );
}
