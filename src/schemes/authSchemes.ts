import * as yup from "yup";

export const registerScheme = yup.object().shape({
  email: yup.string().required().email().lowercase().max(40),
  password: yup
    .string()
    .required()
    .min(6)
    .max(30)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  firstName: yup.string().required().min(3).max(12),
  lastName: yup.string().required().min(3).max(15),
  phone: yup.string().required().min(7).max(15),
  country: yup.string().required(),
});

export const loginScheme = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const updateUserScheme = yup.object().shape({
  email: yup.string().required().email().lowercase().max(40),
  firstName: yup.string().required().min(3).max(12),
  lastName: yup.string().required().min(3).max(15),
});
