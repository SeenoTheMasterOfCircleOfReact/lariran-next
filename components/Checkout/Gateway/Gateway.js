import { useEffect, useState } from "react";
import Title from "../Title/Title";

import classes from "./Gateway.module.scss";
import Radio from "@mui/material/Radio";
import Image from "next/image";

export default function Gateway({ gatewayValue, setGatewayValue, gateways }) {
  const controlProps = (item) => ({
    checked: gatewayValue === item,
    value: item,
    name: "gateway-radio",
    inputProps: { "aria-label": item },
  });

  return (
    <div className={classes.holder}>
      <Title title="درگاه پرداخت را انتخاب کنید" />
      <div className={classes.gateways}>
        {gateways.map((gateway) => (
          <div key={gateway} onClick={() => setGatewayValue(gateway)}>
            <Image
              width={50}
              height={50}
              src={`/images/gateways/${gateway}.png`}
              alt={gateway}
            />
            <Radio
              {...controlProps(gateway)}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
