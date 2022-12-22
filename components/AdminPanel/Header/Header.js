import Link from "next/link";
import React from "react";

import classes from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ closed, onClose }) {
  let toggleClasses = [classes.navbarHeader];
  if (closed) {
    toggleClasses.push(classes.closed);
  }

  return (
    <header className={classes.topBar}>
      <nav className={classes.navBar}>
        <div className={toggleClasses.join(" ")}>
          <Link className={classes.brand} href="/">
            <span className={classes.logoText}>
              <img
                className={classes.logo}
                src={"/images/logo.png"}
                alt="home page"
              ></img>
            </span>
          </Link>
        </div>
        <div className={classes.navbarCollapse}>
          <div className={classes.toggle} onClick={onClose}>
            <MenuIcon sx={{ fontSize: "35px" }} />
          </div>
        </div>
      </nav>
    </header>
  );
}
