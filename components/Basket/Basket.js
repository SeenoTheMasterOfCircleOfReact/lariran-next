import { useContext } from "react";
import { BasketContext } from "../../store/basket-context";
import AlertBg from "../UI/AlertBg/AlertBg";

import LocalMallIcon from "@mui/icons-material/LocalMall";

import classes from "./Basket.module.scss";
import Items from "./Items/Items";
import PurchaseCard from "./PurchaseCard/PurchaseCard";

export default function Basket() {
  const basketCtx = useContext(BasketContext);
  if (basketCtx?.basket && basketCtx?.basket[0]) {
    if (basketCtx.basket[0].length === 0) {
      return (
        <div className={classes.empty}>
          <AlertBg
            refresh={false}
            color="red"
            title="سبد خرید شما خالی است !"
            icon={<LocalMallIcon size="large" />}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.holder}>
          <Items products={basketCtx.basket[0]} />
          <PurchaseCard total={basketCtx.basket.total} />
        </div>
      );
    }
  }
}
