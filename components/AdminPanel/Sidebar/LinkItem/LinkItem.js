import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./LinkItem.module.scss";

export default function LinkItem({ link }) {
  const { asPath } = useRouter();

  const linkClasses = [classes.link];
  if (asPath.includes(link.link)) {
    linkClasses.push(classes.selected);
  }

  const href = `/admin-panel${link.link}`;

  return (
    <div className={linkClasses.join(" ")}>
      <Link
        href={href}
        style={{ display: "flex", gap: "20px", padding: "20px" }}
      >
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </div>
  );
}
