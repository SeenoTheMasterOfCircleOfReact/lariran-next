import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import { useRouter } from "next/router";

import classes from "../../styles/AdminLogin/AdminLogin.module.scss";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { LoadingButton } from "@mui/lab";

export default function AdminLogin() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setServerError(errors.find((e) => e.key === "server"));
  }, [errors]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrors([]);

    axios
      .post("https://api.lariran.com/api/v1/auth/login", null, {
        withCredentials: true,
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
          const errors = Object.keys(response.data.data).map((key) => {
            const newObj = {
              key: key,
              error: response.data.data[key],
            };
            return newObj;
          });
          setErrors(errors);
        } else {
          authCtx.setToken(response.data.data.token);
          localStorage.setItem("token", response.data.data.token);
          router.push("/");
        }
      })
      .catch((error) => {
        setError(true);
        setErrors([{ key: "server", error: error.message }]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={classes.holder}>
      <div className={classes.form}>
        <h2 className={classes.title}>ورود به پنل کاربری</h2>
        <form className={classes.formHolder}>
          <div>
            {serverError && (
              <sub style={{ color: "red" }}>{serverError.error}</sub>
            )}
          </div>
          <TextField
            id="email"
            color="lightBlue"
            label="ایمیل"
            variant="filled"
            sx={{
              width: "100%",
              mb: 3,
            }}
            onChange={handleEmailChange}
            autoComplete="username"
          />
          <FormControl
            sx={{ mb: 3, width: "100%" }}
            variant="filled"
            color="lightBlue"
          >
            <InputLabel htmlFor="filled-adornment-password">
              رمز عبور
            </InputLabel>
            <FilledInput
              autoComplete="current-password"
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <LoadingButton
            onClick={handleLogin}
            loading={loading}
            color="black"
            variant="contained"
            sx={{
              margin: "auto",
              display: "block",
              color: "#fff",
              width: "50%",
            }}
            size="large"
          >
            ورود
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
