import { useEffect, useState } from "react";

import AlertBg from "../../../UI/AlertBg/AlertBg";
import PaginationHolder from "../../Pagination/Pagination";
import User from "./User/User";

import classes from "./Users.module.scss";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";

export default function Users({
  users,
  loading,
  error,
  getUsers,
  token,
  pageCount,
}) {
  const [search, setSearch] = useState(null);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    getUsers(search);
  }

  if (error) {
    return (
      <div className="admin-panel-error">
        <AlertBg
          refresh
          onRefresh={() => getUsers(null)}
          color="red"
          title="مشکلی پیش آمده! لطفا دوباره امتحان کنید."
          icon={<ErrorIcon size="large" />}
        />
      </div>
    );
  }

  return (
    <div className={classes.holder}>
      <div className={classes.Pagination}>
        <PaginationHolder count={pageCount} />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
          onSubmit={handleSearch}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="جستجو"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className={classes.users}>
          {users.map((u) => (
            <User key={u.id} user={u} getUsers={getUsers} token={token} />
          ))}
        </div>
        <PaginationHolder count={pageCount} />
      </div>
    </div>
  );
}
