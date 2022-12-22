import { useState, useEffect } from "react";
import axios from "axios";

import Title from "../Title/Title";

import classes from "./Likes.module.scss";
import LikesHolder from "./LikesHolder/LikesHolder";

export default function Likes({ token, user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    onGetLikes();
  }, []);

  const onGetLikes = () => {
    setLoading(true);
    setError(false);
    setErrors([]);
    const url = `https://api.lariran.com/api/v1/favorite/index`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setError(true);
          const errors = Object.values(response.data.data).map((data) => data);
          setErrors(errors);
        } else {
          setError(false);
          setLikes(response.data.data);
        }
      })
      .catch((error) => {
        setError(true);
        setErrors([error.message]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.likes}>
      <Title title="علاقه مندی ها" />
      <LikesHolder
        likes={likes}
        token={token}
        loading={loading}
        error={error}
        getLikes={onGetLikes}
      />
    </div>
  );
}
