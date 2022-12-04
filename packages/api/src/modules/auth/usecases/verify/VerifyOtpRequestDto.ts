import { IsEmail, IsNumber, Max, Min } from "class-validator";

export class VerifyOtpRequestDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(1000)
  @Max(9999)
  code: number
}
