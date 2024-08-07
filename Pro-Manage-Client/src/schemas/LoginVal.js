import * as yup from "yup";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(regex, { message: "Please enter the valid email Id" })
    .email("Please enter a valid email")
    .required("Field is required"),
  password: yup.string().required("Field is required"),
});
