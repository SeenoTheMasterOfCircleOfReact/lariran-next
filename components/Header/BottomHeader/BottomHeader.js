import { useState, useEffect } from "react";
import {
  useRootCategories,
  useChildCategories,
  useChildrenCount,
} from "../../../hooks/useCategories";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";

import classes from "./bottomHeader.module.scss";
import RootCategories from "./RootCategories/RootCategories";
import ChildCategories from "./ChildCategories/ChildCategories";

export default function BottomHeader() {
  const [category, setCategory] = useState(null);
  const rootCategories = useRootCategories();
  const childCategories = useChildCategories(category);
  const childrenCount = useChildrenCount(category);

  const width = Math.ceil(childrenCount / (rootCategories.length - 2)) * 200;

  function categoryHoverHandler(id) {
    setCategory(id);
  }

  return (
    <div className={classes.bottom}>
      <div className={classes.item}>
        <MenuRoundedIcon />
        <span>دسته بندی ها</span>
        <div className={classes.holder}>
          <div
            className={classes.categories}
            style={{ height: rootCategories.length * 40 + "px" }}
          >
            <RootCategories
              categories={rootCategories}
              categoryHover={categoryHoverHandler}
            />
            <ChildCategories categories={childCategories} width={width} />
          </div>
        </div>
        <div className={classes.shadow}></div>
      </div>
      <div className={classes.item}>
        <LoyaltyOutlinedIcon />
        <span>برندها</span>
      </div>
    </div>
  );
}
