import React, { useState, useContext } from "react";
import { Type } from "../../Utility/Action.type";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/Firebase";
import { CircleLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { DataContext } from "../../components/DataProvider/DataProvider";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const naviaget = useNavigate();
  const navStateData = useLocation();
  //console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userIfno) => {
          dispatch({
            type: Type.SET_USER,
            user: userIfno.user,
          });
          setLoading({ ...loading, signIn: false });
          naviaget(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userIfno) => {
          dispatch({
            type: Type.SET_USER,
            user: userIfno.user,
          });
          setLoading({ ...loading, signUp: false });
          naviaget(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg
"
          alt=""
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <CircleLoader color="black" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By Signing-in you agree to the AMAZON FAKE CLONE conditions of use &
          sale.Please see our privacy Notice,our Cookies and our Interest-based
          Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButtton}
        >
          {loading.signUp ? (
            <CircleLoader color="black" size={15} />
          ) : (
            "  Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
