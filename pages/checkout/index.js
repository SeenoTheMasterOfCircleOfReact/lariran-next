import { useState, useEffect, useContext } from "react";
import Address from "../../components/Checkout/Address/Address";
import Details from "../../components/Checkout/Details/Details";
import Gateway from "../../components/Checkout/Gateway/Gateway";

import classes from "../../styles/Checkout/Checkout.module.scss";

export default function Checkout() {
  const [address, setAddress] = useState(null);
  const [gateway, setGateway] = useState("sepehr");
  const gateways = ["sepehr", "mellat"];

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function handleGatewayChange(g) {
    setGateway(g);
  }

  return (
    <div className={classes.holder}>
      <Address addressValue={address} setAddressValue={handleAddressChange} />
      <Gateway
        gatewayValue={gateway}
        setGatewayValue={handleGatewayChange}
        gateways={gateways}
      />
      <Details address={address} gateway={gateway} />
    </div>
  );
}
