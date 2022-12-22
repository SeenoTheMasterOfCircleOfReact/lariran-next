import classes from "./tabs.module.scss";

export default function Tabs({ tab, changeTab }) {
  return (
    <div className={classes.tabs}>
      <div
        className={
          tab === 0 ? [classes.tab, classes.selected].join(" ") : classes.tab
        }
        onClick={() => changeTab(0)}
      >
        مشخصات
      </div>
      <div
        className={
          tab === 1 ? [classes.tab, classes.selected].join(" ") : classes.tab
        }
        onClick={() => changeTab(1)}
      >
        توضیحات
      </div>
      <div
        className={
          tab === 2 ? [classes.tab, classes.selected].join(" ") : classes.tab
        }
        onClick={() => changeTab(2)}
      >
        نظرات
      </div>
    </div>
  );
}
