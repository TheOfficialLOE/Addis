import { Optional } from "./CoreAssert";
import { CodeDescription } from "./Code";

export type CreateExceptionPayload<Data> = {
  code: CodeDescription,
  overrideMessage?: string,
  data?: Data
};

export class Exception<Data> extends Error {
  public readonly code: number;
  public readonly data: Optional<Data>;

  private constructor(codeDescription: CodeDescription, overrideMessage?: string, data?: Data) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<Data>(payload: CreateExceptionPayload<Data>): Exception<Data> {
    return new Exception<Data>(payload.code, payload.overrideMessage, payload.data);
  }
}
