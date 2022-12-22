import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/auth-context";

import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import classes from "../../styles/Login/Login.module.scss";
import Timer from "../../components/UI/Timer/Timer";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const [action, setAction] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [checkLoading, setCheckLoading] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [checkErrorMessage, setCheckErrorMessage] = useState([]);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState([]);

  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState([]);

  const [token, setToken] = useState(null);

  useEffect(() => {
    authCtx.setToken(token);
  }, [token]);

  function onCheckHandler(e, number) {
    e.preventDefault();
    setCheckLoading(true);
    setCheckError(false);
    setCheckErrorMessage([]);
    const url = "https://api.lariran.com/api/v2/authWithCode/check";
    axios
      .post(url, null, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        params: {
          phone_number: number,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setCheckError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setCheckErrorMessage(errors);
        } else {
          setPhoneNumber(response.data.data.phone_number);
          if (response.data.data.action === "login") {
            setAction(2);
          } else {
            setAction(3);
          }
        }
      })
      .catch((error) => {
        setCheckError(true);
        setCheckErrorMessage([error.message]);
      })
      .finally(() => {
        setCheckLoading(false);
      });
  }

  function onLoginHandler(e, number, code) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(false);
    setLoginErrorMessage([]);
    const url = "https://api.lariran.com/api/v2/authWithCode/login";
    axios
      .post(url, null, {
        withCredentials: true,
        params: {
          code: code,
          phone_number: number,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setLoginError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setLoginErrorMessage(errors);
        } else {
          setToken(response.data.data.token);
          localStorage.setItem("token", response.data.data.token);
          router.push("/");
        }
      })
      .catch((error) => {
        setCheckError(true);
        setCheckErrorMessage([error.message]);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }

  function onSignupHandler(e, phoneNumber, name) {
    e.preventDefault();
    setSignupLoading(true);
    setSignupErrorMessage([]);
    setSignupError(false);
    const url = "https://api.lariran.com/api/v2/authWithCode/register";
    axios
      .post(url, null, {
        withCredentials: true,
        params: {
          name: name,
          phone_number: phoneNumber,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setSignupError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setSignupErrorMessage(errors);
        } else {
          setPhoneNumber(response.data.data.phone_number);
          if (response.data.data.action === "login") {
            setAction(2);
          } else {
            setAction(3);
          }
        }
      })
      .catch((error) => {
        setCheckError(true);
        setCheckErrorMessage([error.message]);
      })
      .finally(() => {
        setSignupLoading(false);
      });
  }

  return (
    <div className={classes.holder}>
      {action === 1 && (
        <Check
          action={action}
          loading={checkLoading}
          error={checkError}
          errorMessage={checkErrorMessage}
          onCheck={onCheckHandler}
        ></Check>
      )}
      {action === 2 && (
        <LoginForm
          action={action}
          number={phoneNumber}
          loading={loginLoading}
          error={loginError}
          errorMessage={loginErrorMessage}
          onCheck={onCheckHandler}
          onBack={() => setAction(1)}
          onLogin={onLoginHandler}
        ></LoginForm>
      )}
      {action === 3 && (
        <SignupForm
          action={action}
          number={phoneNumber}
          loading={signupLoading}
          error={signupError}
          errorMessage={signupErrorMessage}
          onCheck={onCheckHandler}
          onBack={() => setAction(1)}
          onSignup={onSignupHandler}
        ></SignupForm>
      )}
    </div>
  );
}

function SignupForm({
  action,
  number,
  loading,
  error,
  errorMessage,
  onBack,
  onSignup,
}) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <Fade in={action === 3}>
      <form
        className={classes.signup}
        onSubmit={(e) => onSignup(e, number, name)}
      >
        <div className={classes.top}>
          <div className={classes.Home}></div>
          <div className={classes.Arrow} onClick={onBack}>
            <KeyboardArrowLeftIcon />
          </div>
        </div>
        <Typography
          sx={{ fontFamily: "inherit", mb: 4 }}
          variant="h6"
          gutterBottom
          component="div"
        >
          ثبت نام
        </Typography>
        <Typography
          sx={{ fontFamily: "inherit", mb: 3 }}
          variant="body2"
          gutterBottom
        >
          حساب کاربری ای با این شماره تلفن یافت نشد، ابتدا ثبت نام کنید
        </Typography>
        <TextField
          error={error}
          color="lightBlue"
          sx={{
            fontFamily: "inherit",
            direction: "ltr",
            mb: 2,
          }}
          fullWidth
          id="outlined-basic"
          label="نام و نام خانوادگی"
          variant="outlined"
          onChange={handleChange}
        />
        <div className={classes.errorMessage}>
          {errorMessage.map((error, i) => (
            <sub key={i}>{error}</sub>
          ))}
        </div>
        <LoadingButton
          loading={loading}
          sx={{
            width: "100%",
          }}
          variant="contained"
          type="submit"
        >
          ثبت نام
        </LoadingButton>
      </form>
    </Fade>
  );
}

function LoginForm({
  action,
  number,
  loading,
  error,
  errorMessage,
  onCheck,
  onBack,
  onLogin,
}) {
  const [code, setCode] = useState("");

  function handleChange(e) {
    setCode(e.target.value);
  }

  return (
    <Fade in={action === 2}>
      <form
        className={classes.login}
        onSubmit={(e) => onLogin(e, number, code)}
      >
        <div className={classes.top}>
          <div className={classes.Home}>
            <Link href={"/"} style={{ color: "rgb(34, 193, 247)" }}>
              خانه
            </Link>
          </div>
          <div className={classes.Arrow} onClick={onBack}>
            <KeyboardArrowLeftIcon />
          </div>
        </div>
        <Typography
          sx={{ fontFamily: "inherit", mb: 4 }}
          variant="h6"
          gutterBottom
          component="div"
        >
          ورود
        </Typography>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <div>درحال ارسال کد به شماره {number}</div>
        </div>
        <Typography
          sx={{ fontFamily: "inherit", mb: 3 }}
          variant="body2"
          gutterBottom
        >
          کد تایید را وارد کنید
        </Typography>
        <TextField
          error={error}
          color="lightBlue"
          sx={{
            fontFamily: "inherit",
            direction: "ltr",
            mb: 2,
          }}
          fullWidth
          id="outlined-basic"
          label="کد تایید"
          variant="outlined"
          onChange={handleChange}
        />
        <div>
          <span>کد تایید را دریافت نکرده اید؟</span>
          <Timer onCheck={() => onCheck(number)} />
        </div>
        <div className={classes.errorMessage}>
          {errorMessage.map((error, i) => (
            <sub key={i}>{error}</sub>
          ))}
        </div>
        <LoadingButton
          loading={loading}
          sx={{
            width: "100%",
          }}
          variant="contained"
          type="submit"
        >
          ورود
        </LoadingButton>
      </form>
    </Fade>
  );
}

function Check({ action, loading, error, errorMessage, onCheck }) {
  const [number, setNumber] = useState("");

  function handleChange(e) {
    setNumber(e.target.value);
  }

  return (
    <Fade in={action === 1}>
      <form className={classes.check} onSubmit={(e) => onCheck(e, number)}>
        <Link href={"/"} style={{ color: "rgb(34, 193, 247)" }}>
          خانه
        </Link>
        <Typography
          sx={{
            fontFamily: "inherit",
            mb: 4,
          }}
          variant="h6"
          gutterBottom
          component="div"
        >
          ورود | ثبت نام
        </Typography>
        <Typography
          sx={{
            fontFamily: "inherit",
            mb: 3,
          }}
          variant="body2"
          gutterBottom
        >
          برای ورود به حساب کاربری شماره تلفن خودرا وارد کنید
        </Typography>
        <TextField
          color="lightBlue"
          error={error}
          sx={{
            fontFamily: "inherit",
            direction: "ltr",
          }}
          fullWidth
          id="outlined-basic"
          label="شماره تلفن"
          variant="outlined"
          onChange={handleChange}
        />
        <div className={classes.errorMessage}>
          {errorMessage.map((error, i) => (
            <sub key={i}>{error}</sub>
          ))}
        </div>
        <LoadingButton
          loading={loading}
          sx={{
            width: "100%",
          }}
          variant="contained"
          type="submit"
        >
          ورود
        </LoadingButton>
      </form>
    </Fade>
  );
}
