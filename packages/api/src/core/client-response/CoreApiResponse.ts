import { Nullable } from "../util/CoreAssert";
import { Code } from "./Code";

export class CoreApiResponse<Data> {

  public readonly code: number;

  public readonly message: string;
  public readonly data: Nullable<Data>;

  private constructor(code: number, message: string, data?: Data) {
    this.code      = code;
    this.message   = message;
    this.data      = data || null;
  }

  public static success<TData>(data?: TData, message?: string): CoreApiResponse<TData> {
    const resultCode: number = Code.SUCCESS.code;
    const resultMessage: string = message || Code.SUCCESS.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultCode: number = code || Code.INTERNAL_ERROR.code;
    const resultMessage: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
