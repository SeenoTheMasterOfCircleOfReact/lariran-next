import DesktopHeader from "./DesktopHeader/DesktopHeader";

import classes from "./header.module.scss";
import MobileHeader from "./MobileHeader/MobileHeader";

export default function Header({ loading, user }) {
  return (
    <>
      <DesktopHeader loading={loading} user={user} />
      <MobileHeader />
    </>
  );
}
