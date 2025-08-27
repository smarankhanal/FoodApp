import { validationResult } from "express-validator";
import ApiError from "../utlis/ApiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(new ApiError(422, "Validation Error", extractedErrors));
  }

  next();
};
