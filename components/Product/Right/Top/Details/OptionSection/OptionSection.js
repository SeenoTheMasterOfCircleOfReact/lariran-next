import React, { useState, useEffect } from "react";

import classes from "./optionSection.module.scss";
import Title from "./Title/Title";
import Varieties from "./Varieties/Varieties";

export default function OptionSection({
  option,
  varieties,
  variety,
  selectVariety,
}) {
  return (
    <>
      {varieties?.length > 0 && (
        <div className={classes.option}>
          <Title option={option.name} variety={variety} />
          <Varieties
            option={option.name}
            varieties={varieties}
            variety={variety}
            selectVariety={selectVariety}
          />
        </div>
      )}
    </>
  );
}
