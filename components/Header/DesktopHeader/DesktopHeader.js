import BottomHeader from "../BottomHeader/BottomHeader";
import TopHeader from "../TopHeader/TopHeader";

import classes from "./desktopHeader.module.scss";

export default function DesktopHeader({ loading, user }) {
  return (
    <header className={classes.header}>
      <div className={classes.holder}>
        <TopHeader loading={loading} user={user} />
        <BottomHeader />
      </div>
    </header>
  );
}
