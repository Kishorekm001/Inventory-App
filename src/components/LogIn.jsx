import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const LogIn = ({ login, setLogin, setUserInput, AdminMail, AdminPass }) => {
  const [input, setInput] = useState([]);
  const [data, setData] = useState([]);
  const [signUp, setSignUp] = useState(false);
  // console.log(input);
  const fetchUsers = () => {
    const res = axios
      .get(`http://localhost:3000/users`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log("input", input);
    const result = data.filter(
      (item) =>
        (item.Email === input.Email && item.password === input.password) ||
        (AdminMail === input.Email && AdminPass === input.password)
    );

    if (result.length > 0) {
      setLogin(true);
      setUserInput(input);
    }
  };

  const goToSignup = (e) => {
    e.preventDefault();
    setSignUp(true);
  };

  return (
    <>
      {!signUp ? (
        <>
          <h1>LOG IN</h1>
          <div className="login">
            <form>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="Email"
                placeholder="EMail"
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
                required
              />
              <Link to="/Home.js">
                <button type="submit" onClick={handleClick}>
                  Login
                </button>
              </Link>

              <button onClick={goToSignup}>SignUp</button>
            </form>
          </div>
        </>
      ) : (
        <SignUp fetchUsers={fetchUsers} setSignUp={setSignUp} />
      )}
    </>
  );
};

export default LogIn;
