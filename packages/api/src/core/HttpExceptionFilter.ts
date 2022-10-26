import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CoreApiResponse } from "./CoreApiResponse";
import { Exception } from "./Exception";
import { Response } from 'express';

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
    response.json("error bro")
  }
}
