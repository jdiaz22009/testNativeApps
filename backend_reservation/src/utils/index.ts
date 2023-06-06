import { ValidationError } from "class-validator";
import { Response } from "express";
import { errorsValidate } from "../constants";

export const handlerValidationErr = (err: ValidationError[]) => {
  const validationDetails: any = [];
  for (const validationError of err) {
    const validationTrigger: any = validationError.constraints
      ? Object.keys(validationError.constraints)[0]
      : [];
    console.log(validationTrigger, "hola");
    validationDetails.push(
      errorsValidate[validationTrigger].replace(
        "{property}",
        validationError.property
      )
    );
  }
  return { validationDetails };
};

export const handlerSuccess = (res: Response, data?: any) => {
  return res.status(200).json({
    result: "OK",
    message: "Success",
    data,
  });
};
export const handlerFail = (res: Response, data?: any) => {
  return res.status(503).json({
    result: "ERROR",
    message: "Fail",
    data: data,
  });
};
