import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { SignupSchema } from "./validations/SignupVal";

export default function SignUp({ fetchUsers, setSignUp }) {
  const [signupInput, setSignupInput] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const { Email, password, confirm_password } = signupInput;

  // console.log("Inputs", signupInput);

  const handleChange = (e) => {
    e.preventDefault();
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    // console.log(signupInput);
    e.preventDefault();
    const result = validate(signupInput);
    setFormErrors(result);
    console.log("form", result);

    if (Object.keys(result).length === 0) {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInput),
      });
      if (res.ok) {
        fetchUsers();
        console.log(res.status);
        setSignUp(false);
      }
    }
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(signupInput);
  //   }
  // }, [formErrors]);

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!Email) {
      errors.Email = "Email is required!";
    } else if (!regex.test(Email)) {
      errors.Email = "This is not a valid email format!";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (password !== confirm_password) {
      errors.confirm_password = "password doesn't match with confirm password";
    }

    return errors;
  };

  return (
    <>
      <h1>SIGN UP</h1>
      <div className="signup">
        <form onSubmit={handleSignUp}>
          <div className="email">
            <label htmlFor="Email"> Email</label>

            <input
              type="email"
              name="Email"
              placeholder="EMail"
              value={Email}
              onChange={handleChange}
              required
            />
            <p style={{ color: "red", marginTop: "3px", fontSize: "10px" }}>
              {" "}
              {formErrors.Email}{" "}
            </p>
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>{" "}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="password"
              required
            />{" "}
            <p style={{ color: "red", marginTop: "3px", fontSize: "10px" }}>
              {" "}
              {formErrors.password}{" "}
            </p>
          </div>

          <div className="confirm_password">
            <label htmlFor="confirm_password">Confirm Password</label>

            <input
              type="password"
              name="confirm_password"
              onChange={handleChange}
              value={confirm_password}
              placeholder="Confirm Password"
            />
            <p style={{ color: "red", marginTop: "3px", fontSize: "10px" }}>
              {formErrors.confirm_password}
            </p>
          </div>

          <button type="submit">SignUp</button>
          {/* <h5>{formErrors?.Email || formErrors?.password}</h5> */}
        </form>
      </div>
    </>
  );
}
// let formData = {
//   Email: e.target[0].value,
//   password: e.target[1].value,
//   c_password: e.target[2].value,
// };
// console.log("formdata--", formData);

// const isValid = await SignupSchema.isValid(formData);
// console.log(isValid);
