import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  Email: yup.string().email().required("Invalid Email Address"),
  password: yup.string().min(4).max(10).required(),
});
