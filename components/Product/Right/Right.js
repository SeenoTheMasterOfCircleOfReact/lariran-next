import { useContext, useState } from "react";

import classes from "../../../styles/Product/Right/right.module.scss";

import BreadcrumbsHolder from "./BreadcrumbsHolder/BreadcrumbsHolder";
import Top from "./Top/Top";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Tabs from "./Tabs/Tabs";
import TabPanel from "./TabPanel/TabPanel";

export default function Right({
  product,
  related,
  varieties,
  variety,
  selectVariety,
}) {
  const [tab, setTab] = useState(0);

  const changeTabHandler = (t) => {
    setTab(t);
  };

  return (
    <div className={classes.holder}>
      <BreadcrumbsHolder category={product?.category_id} />
      <Top
        product={product}
        varieties={varieties}
        variety={variety}
        selectVariety={selectVariety}
      ></Top>
      <RelatedProducts related={related} />
      <Tabs tab={tab} changeTab={changeTabHandler} />
      <TabPanel
        tab={tab}
        attributes={product?.attributes}
        description={product?.description}
      />
    </div>
  );
}
