import { IsEmail, IsOptional, IsString } from "class-validator";

export class SignInRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  username?: string
}
