import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
