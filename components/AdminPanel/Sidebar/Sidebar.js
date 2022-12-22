import React from "react";
import ProductHolder from "./ProductHolder/ProductHolder";

import classes from "./Sidebar.module.scss";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EditAttributesOutlinedIcon from "@mui/icons-material/EditAttributesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LinksHolder from "./LinksHolder/LinksHolder";

const productLinks = [
  {
    link: "/products?page=1",
    name: "محصولات",
    icon: <Inventory2OutlinedIcon />,
  },
  {
    link: "/products/add",
    name: "افزودن محصول",
    icon: <AddCircleOutlineRoundedIcon />,
  },
  {
    link: "/options?page=1",
    name: "اپشن ها",
    icon: <DisplaySettingsOutlinedIcon />,
  },
  {
    link: "/waranties?page=1",
    name: "گارانتی",
    icon: <GppGoodOutlinedIcon />,
  },
  {
    link: "/currency?page=1",
    name: "واحد پول",
    icon: <PaidOutlinedIcon />,
  },
  // {
  //   link: "/attributes?page=1",
  //   name: "مشخصات فنی",
  //   icon: <EditAttributesOutlinedIcon />,
  // },
];
const links = [
  {
    link: "/categories?page=1",
    name: "دسته بندی ها",
    icon: <CategoryOutlinedIcon />,
  },
  {
    link: "/brands?page=1",
    name: "برند ها",
    icon: <LoyaltyOutlinedIcon />,
  },
  {
    link: "/orders?page=1",
    name: "سفارشات",
    icon: <AddShoppingCartOutlinedIcon />,
  },
  {
    link: "/comments?page=1",
    name: "نظرات",
    icon: <MarkChatUnreadOutlinedIcon />,
  },
  {
    link: "/users?page=1",
    name: "کاربران",
    icon: <GroupsOutlinedIcon />,
  },
  {
    link: "/senders?page=1",
    name: "فرستنده ها",
    icon: <ContactMailOutlinedIcon />,
  },
];

export default function Sidebar({ closed }) {
  let toggleClasses = [classes.rightSidebar];

  if (closed) {
    toggleClasses.push(classes.closed);
  }

  return (
    <aside className={toggleClasses.join(" ")}>
      <div className={classes.scrollSidebar}>
        <nav className={classes.sidebarNav}>
          <ProductHolder links={productLinks} />
          <LinksHolder links={links} />
        </nav>
      </div>
    </aside>
  );
}
