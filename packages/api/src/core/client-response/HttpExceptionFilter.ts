import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { CoreApiResponse } from "./CoreApiResponse";
import { Exception } from "../base-classes/Exception";
import { Response } from 'express';
import { ValidationError } from "class-validator";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: any, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    if (error instanceof Exception) {
      response
        .status(error.code)
        .json(
          CoreApiResponse.error(error.code, error.message, error.data)
        );
      return;
    }
    if (error instanceof ValidationError) {
      response
        .status(400)
        .json(
          CoreApiResponse.error<string>(400, "Validation Error", Object.values(error.constraints)[0])
        )
      return;
    }
    if (error instanceof UnauthorizedException) {
      response
        .status(401)
        .json(
          CoreApiResponse.error<string>(401, error.message)
        );
      return;
    }
    response.
      status(500)
      .json(
        CoreApiResponse.error<string>(500, "Internal Server Error")
      );
    console.log(error);
  }
}
