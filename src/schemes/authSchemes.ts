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
  firstName: yup
    .string()
    .required()
    .min(3)
    .max(12)
    .matches(/^[aA-zZ\s]+$/, "Please enter a valid first name name"),
  lastName: yup
    .string()
    .required()
    .min(3)
    .max(15)
    .matches(/^[aA-zZ\s]+$/, "Please enter a valid last name name"),
  phone: yup.string().required().min(7).max(15),
  country: yup.string().required(),
});

export const loginScheme = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const updateUserScheme = yup.object().shape({
  email: yup.string().required().email().lowercase().max(40),
  firstName: yup
    .string()
    .required()
    .min(3)
    .max(12)
    .matches(/^[aA-zZ\s]+$/, "Please enter a valid first name name"),
  lastName: yup
    .string()
    .required()
    .min(3)
    .max(15)
    .matches(/^[aA-zZ\s]+$/, "Please enter a valid last name name"),
});

export const updateAvatarScheme = yup.object().shape({
  avatar: yup.lazy((value) =>
    /^data/.test(value)
      ? yup
          .string()
          .trim()
          .matches(/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i, "Must be a valid data URI")
          .required()
          .nullable()
      : yup.string().trim().url("Must be a valid URL/Format").required()
  ),
});
