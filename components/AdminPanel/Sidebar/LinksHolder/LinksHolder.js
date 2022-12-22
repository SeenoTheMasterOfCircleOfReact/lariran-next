import React from "react";
import LinkItem from "../LinkItem/LinkItem";

import classes from "./LinksHolder.module.scss";

export default function LinksHolder({ links }) {
  return (
    <>
      {links.map((link) => (
        <LinkItem key={link.link} link={link} />
      ))}
    </>
  );
}
