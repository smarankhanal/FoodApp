import { body } from "express-validator";

export const registerValidator = [
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Full name must contain only alphabets and spaces")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),

  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^9\d{9}$/)
    .withMessage("Phone must start with 9 and be 10 digits long"),
];

export const updateAccountValidator = [
  body("fullname")
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Full name must contain only alphabets and spaces")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),

  body("username")
    .optional({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters"),

  body("phoneNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^9\d{9}$/)
    .withMessage("Phone must start with 9 and be 10 digits long"),
];

export const updatePasswordValidator = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),
];
