import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import classes from "./OrderDetail.module.scss";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import CreditCardTwoToneIcon from "@mui/icons-material/CreditCardTwoTone";
import { Card, Divider, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function OrderDetail({ action, order, tab, search, from, to }) {
  const router = useRouter();

  const [tCode, setTCode] = useState("");
  const [tCodeLoading, setTCodeLoading] = useState(false);

  const [status, setStatus] = useState(0);
  const [statusLoading, setStatusLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: null,
    phone: null,
    postalCode: null,
    address: null,
  });

  useEffect(() => {
    if (order.tracking_code) {
      setTCode(order.tracking_code);
    }
    setStatus(order.status.id);
    const newCustomer = {
      name: order?.user?.name,
      phone: order?.user?.phone_number,
      postalCode: order?.shiping?.postal_code,
      address:
        order?.shiping?.city?.province?.name +
        " - " +
        order?.shiping?.city?.name +
        " - " +
        order?.shiping?.address,
    };
    setCustomer(newCustomer);
  }, [order]);

  const tCodeChangeHandler = (e) => {
    setTCode(e.target.value);
  };
  const setTCodeHandler = () => {
    setTCodeLoading(true);
    const url = `https://api.lariran.com/api/v1/order/${order.id}/change/trackingCode`;
    const token = localStorage.getItem("token");
    axios
      .post(url, null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          tracking_code: tCode,
        },
      })
      .then((response) => {
        setTCodeLoading(false);
        if (response.data.status === "error") {
          //   toast.error("?????????? ?????? ?????????? ???????? ???????????? ???????????? ????????");
        } else {
          //   toast.success("???? ???????????? ???? ???????????? ?????? ????");
          if (tab === "200") {
            getOrders(null, search, from, to);
          } else {
            getOrders(tab, search, from, to);
          }
        }
      })
      .catch((error) => {
        setTCodeLoading(false);
      });
  };

  const products = order.products.map((product) => {
    return (
      <Card ke className={classes.Product} key={product.id}>
        <img
          alt={product.persist}
          src={"https://api.lariran.com" + product.image}
        ></img>
        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {product.persian_title}
        </div>
        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {product.color_id.title}
        </div>
        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {"?????????? : " + product.quantity}
        </div>
      </Card>
    );
  });

  let trackingCode = "_";
  if (order.tracking_code) {
    trackingCode = order.tracking_code;
  }
  return (
    <div
      style={{
        width: "100%",
        direction: "rtl",
        padding: "30px",
      }}
    >
      {/* <ToastContainer position="top-left" /> */}
      <div
        style={{
          padding: "15px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className={classes.Small}>?????????? ?????????? : </span>
            <span className={classes.Bold}>{" " + order?.id + " "}</span>
          </div>
          <div>
            <span className={classes.Small}>?????????? : </span>
            <span className={classes.Bold}>
              {" " + order?.created_at + " "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>???? ???????????? : </span>
            <span className={classes.Bold}>{" " + trackingCode + " "}</span>
          </div>
        </div>
      </div>
      <Divider />
      <div
        style={{
          padding: "15px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <BadgeTwoToneIcon fontSize="large" sx={{ color: "#1976d2" }} />
          <h3
            style={{
              color: "#1976d2",
              fontSize: "22px",
              fontWeight: "500",
              margin: "0",
            }}
          >
            ?????????? ?????????? :{" "}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className={classes.Small}>?????? : </span>
            <span className={classes.Bold}>
              {" " + order?.user?.name + " "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>?????????? ???????? : </span>
            <span className={classes.Bold}>
              {" " + order?.user?.phone_number + " "}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div
        style={{
          padding: "15px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <HomeTwoToneIcon fontSize="large" sx={{ color: "#1976d2" }} />
          <h3
            style={{
              color: "#1976d2",
              fontSize: "22px",
              fontWeight: "500",
              margin: "0",
            }}
          >
            ???????? ???????? :{" "}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "15px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className={classes.Small}>?????????? : </span>
            <span className={classes.Bold}>
              {" " + order?.shiping?.city?.province?.name + " "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>?????? : </span>
            <span className={classes.Bold}>
              {" " + order?.shiping?.city?.name + " "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>???? ???????? : </span>
            <span className={classes.Bold}>
              {" " + order?.shiping?.postal_code + " "}
            </span>
          </div>
        </div>
        <div>
          <div>
            <span className={classes.Small}>???????? : </span>
            <span className={classes.Bold}>
              {" " + order?.shiping?.address + " "}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div
        style={{
          padding: "15px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <SellTwoToneIcon fontSize="large" sx={{ color: "#1976d2" }} />
          <h3
            style={{
              color: "#1976d2",
              fontSize: "22px",
              fontWeight: "500",
              margin: "0",
            }}
          >
            ?????????????? :{" "}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {products}
        </div>
      </div>
      <Divider />
      <div
        style={{
          padding: "15px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <CreditCardTwoToneIcon fontSize="large" sx={{ color: "#1976d2" }} />
          <h3
            style={{
              color: "#1976d2",
              fontSize: "22px",
              fontWeight: "500",
              margin: "0",
            }}
          >
            ?????????? :{" "}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className={classes.Small}>???????? : </span>
            <span className={classes.Bold}>
              {" " + order?.amount + " ?????????? "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>???????? ???????? ?????????? ?? ?????????? : </span>
            <span className={classes.Bold}>
              {" " + order?.amount_without_shipping_price + " ?????????? "}
            </span>
          </div>
          <div>
            <span className={classes.Small}>?????????? : </span>
            <span className={classes.Bold}>{" " + order?.gateway + " "}</span>
          </div>
          <div>
            <span className={classes.Small}>???? ???????????? : </span>
            <span className={classes.Bold}>
              {" " + order?.payment_tracker_code + " "}
            </span>
          </div>
        </div>
      </div>
      {/* {action && (
        <>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "15px",
              gap: "5px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="???? ????????????"
              variant="filled"
              sx={{ fontFamily: "inherit", width: "200px" }}
              value={tCode}
              onChange={tCodeChangeHandler}
            />
            <LoadingButton
              variant="contained"
              sx={{ fontFamily: "inherit" }}
              onClick={setTCodeHandler}
              loading={tCodeLoading}
            >
              ??????
            </LoadingButton>
          </div>
        </>
      )} */}

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
          gap: "5px",
        }}
      >
        <FormControl
          variant="filled"
          sx={{ fontFamily: "inherit", width: "200px" }}
        >
          <InputLabel id="demo-simple-select-label">
            ?????????? ?????????? ??????????
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="?????????? ?????????? ??????????"
            onChange={statusChangeHandler}
            value={status}
          >
            <MenuItem value={0}>?????? ??????</MenuItem>
            <MenuItem value={1}>???????????? ??????</MenuItem>
            <MenuItem value={2}>?????????? ??????????</MenuItem>
            <MenuItem value={3}>?????????? ??????</MenuItem>
            <MenuItem value={-1}>?????????? ??????</MenuItem>
            <MenuItem value={100}>???????????????? ????????????</MenuItem>
            <MenuItem value={10}>?????????? ????????????</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          variant="contained"
          color="warning"
          sx={{ fontFamily: "inherit" }}
          onClick={setStatusHandler}
          loading={statusLoading}
        >
          ??????
        </LoadingButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
          gap: "5px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ fontFamily: "inherit" }}
          onClick={() => openFactorHandle(true)}
          size="large"
        >
          ?????????? ????????????
        </Button>
        <Dialog
          open={factor}
          onClose={() => openFactorHandle(false)}
          fullScreen
          style={{
            width: "100%",
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => openFactorHandle(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{
                  ml: 2,
                  flex: 1,
                  mr: 2,
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
                variant="h6"
                component="div"
              >
                ???????????? ????????
              </Typography>
            </Toolbar>
          </AppBar>
          <Factor
            customer={customer}
            orderNumber={order.id}
            products={order.products}
          />
        </Dialog>
      </div> */}
    </div>
  );
}
