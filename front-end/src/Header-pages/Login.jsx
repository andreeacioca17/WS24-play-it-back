import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { config } from "../../src/config.js";
{
  /* import { Link } from "react-router-dom"; */
}

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);

  const onChangeUser = (e) => setUsername(e.target.value);
  const onChangePass = (e) => setPassword(e.target.value);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      return () => console.log("cleanup");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const userdata = { username, password };
    console.log(userdata);
    setUsername(""); // after click on LogIn, username will be cleared out
    setPassword("");

    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      return;
    }

    /*"http://localhost:3000/auth/login"*/

    fetch(`${config.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // parse the response
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error("Wrong username or password");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        console.log("Login succesful");
        setLoggedIn(true);
      })

      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setError("");
    return;
  };

  return (
    <>
      {loggedIn ? (
        <div className={styles.containerLogout}>
          <p>You are logged in!</p>
          <button
            className={styles.content}
            type="submit"
            name="login"
            onClick={handleLogOutClick}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.container}>
            <h1>SIGN IN</h1>
            <form>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                placeholder="your username"
                autoComplete="off"
                required
                value={username}
                onChange={onChangeUser}
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="your password"
                required
                value={password}
                onChange={onChangePass}
              />
              <br />
              <div>
                <button onClick={handleClick}>LOG IN</button>

                {/* Show the error to user */}
                {error && <p>{error}</p>}
              </div>
            </form>
            {/*   <p>
              Do not have an account?
              <span>
                <Link to="/Register" className={styles.link}>
                  Register here
                </Link>
              </span>
            </p>
            */}
          </div>
        </div>
      )}
    </>
  );
}

export default LogIn;
