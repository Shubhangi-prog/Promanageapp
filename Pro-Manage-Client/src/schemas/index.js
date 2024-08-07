import * as yup from "yup";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const basicSchema = yup.object().shape({
  name: yup.string().max(25).required("Field is required"),
  email: yup
    .string()
    .matches(regex, { message: "Please enter the valid email Id" })
    .email("Please enter a valid email")
    .required("Field is required"),
  password: yup.string().max(16).required("Field is required"),
  confirmPassword: yup
    .string()
    .max(16)
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Field is required"),
});
