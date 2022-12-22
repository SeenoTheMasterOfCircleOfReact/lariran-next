import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import Title from "../Title/Title";

import classes from "./Details.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(name, price) {
  return { name, price };
}

const rows = [
  createData("کیر", "1103293 تومان"),
  createData("کون", "1103293 تومان"),
  createData("کص", "1103293 تومان"),
  createData("ممه", "1103293 تومان"),
];

export default function Details({ address, gateway }) {
  const authCtx = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsArray, setDetailsArray] = useState([]);

  const token = authCtx.token;

  useEffect(() => {
    address && onGetDetails();
  }, [address]);

  useEffect(() => {
    details &&
      setDetailsArray(
        Object.keys(details).map((key) => {
          const newObj = { name: key, value: details[key] };
          return newObj;
        })
      );
  }, [details]);

  function onGetDetails() {
    setLoading(true);
    const url = "https://api.lariran.com/api/v1/basket/cost/check";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          shipping: address,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "error") {
        } else {
          setDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function goToFinalStep(event) {
    const url = "https://api.lariran.com/api/v1/basket/checkout";
    axios
      .post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          method: "online",
          shipping: address,
          gateway: gateway,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={classes.holder}>
      <Title title="جزئیات پرداخت"></Title>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="details table">
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell align="left">هزینه</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailsArray.map((detail, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {detail.name}
                </TableCell>
                <TableCell align="left">{detail.value + " تومان "}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="success"
        sx={{ display: "block", margin: " 20px auto", fontSize: "1.1rem" }}
        size="large"
        onClick={goToFinalStep}
      >
        پرداخت
      </Button>
    </div>
  );
}
