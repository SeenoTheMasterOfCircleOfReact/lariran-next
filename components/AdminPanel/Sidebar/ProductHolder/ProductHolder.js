import { useState } from "react";

import classes from "./ProductHolder.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LinkItem from "../LinkItem/LinkItem";

export default function ProductHolder({ links }) {
  const [open, setOpen] = useState(false);

  function handleOpenToggle() {
    open ? setOpen(false) : setOpen(true);
  }

  let linksClasses = [classes.linkHolder];

  if (open) {
    linksClasses.push(classes.open);
  }

  return (
    <div className={classes.holder}>
      <div className={classes.title} onClick={handleOpenToggle}>
        <div>تنظیمات محصول</div>
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      <div className={linksClasses.join(" ")}>
        {links.map((link) => (
          <LinkItem key={link.link} link={link} />
        ))}
      </div>
    </div>
  );
}
