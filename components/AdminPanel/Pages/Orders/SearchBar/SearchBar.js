import React from "react";

import classes from "./SearchBar.module.scss";
import { AppBar, Button, MenuItem, TextField, Toolbar } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";

const orderStatus = [
  { value: "200", name: "همه" },
  { value: "0", name: "لغو شده" },
  { value: "1", name: "پرداخت شده" },
  { value: "2", name: "تایید انبار" },
  { value: "3", name: "ارسال شده" },
  { value: "10", name: "درحال پردازش" },
  { value: "-1", name: "مرجوع شده" },
  { value: "100", name: "در انتظار پرداخت" },
];

export default function SearchBar({
  search,
  searchChange,
  status,
  statusChange,
  date,
  dateChange,
  dateFrom,
  dateTo,
  clearDate,
  getOrders,
}) {
  let dateValue = "انتخاب بازه زمانی";
  if (date) {
    dateValue = dateFrom.format() + " ~ " + dateTo.format();
  }

  return (
    <div className={classes.holder}>
      <AppBar
        position="static"
        style={{
          marginBottom: "10px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <Toolbar style={{ padding: "10px" }}>
          <div className={classes.filters}>
            <div className={classes.right}>
              <div className={classes.search}>
                <TextField
                  size="small"
                  color="lightBlue"
                  variant="filled"
                  label="شماره سفارش"
                  id="search-input"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  value={search}
                  onChange={searchChange}
                />
              </div>
              <div className={classes.select}>
                <TextField
                  select
                  size="small"
                  color="lightBlue"
                  variant="filled"
                  label="وضعیت سفارش"
                  id="search-input"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                  value={status}
                  onChange={statusChange}
                >
                  {orderStatus.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className={classes.left}>
              <div className={classes.calender}>
                <DatePicker
                  style={{
                    backgroundColor: "#f0f0f0",
                  }}
                  className="rmdp-mobile"
                  calendar={persian}
                  locale={persian_fa}
                  range
                  value={date}
                  onChange={dateChange}
                  render={(value, openCalendar) => {
                    return (
                      <div className={classes.DatePickerButton}>
                        <div
                          className={classes.Right}
                          onClick={openCalendar}
                          style={{
                            width: date ? "calc(100% - 40px)" : "100%",
                          }}
                        >
                          {dateValue}
                        </div>
                        <div
                          className={classes.Left}
                          onClick={clearDate}
                          style={{
                            display: date ? "flex" : "none",
                          }}
                        >
                          <CloseRoundedIcon
                            style={{ fontSize: 30 }}
                          ></CloseRoundedIcon>
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", height: "48px" }}
                  onClick={() => getOrders()}
                >
                  جستجو
                </Button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
