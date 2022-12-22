import { useContext } from "react";
import AlertBg from "../../components/UI/AlertBg/AlertBg";
import { BasketContext } from "../../store/basket-context";

import ErrorIcon from "@mui/icons-material/Error";

import BasketHolder from "../../components/Basket/Basket";

import classes from "../../styles/Basket/Basket.module.scss";

export default function Basket() {
  const basketCtx = useContext(BasketContext);
  return (
    <div className={classes.holder}>
      {basketCtx.error && (
        <div className={classes.error}>
          <AlertBg
            refresh={true}
            onRefresh={basketCtx.getBasket}
            color="red"
            title="مشکلی پیش آمده است. لطفا دوباره امتحان نمایید"
            icon={<ErrorIcon size="large" />}
          />
        </div>
      )}
      {!basketCtx.error && <BasketHolder />}
    </div>
  );
}
