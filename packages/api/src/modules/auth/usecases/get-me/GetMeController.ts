import { Controller, Get } from "@nestjs/common";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { GetMeResponseDto } from "@api/modules/auth/usecases/get-me/GetMeResponseDto";
import { CoreApiResponse } from "@api/core/client-response/CoreApiResponse";

@Controller("auth")
@IsAuthentic()
export class GetMeController {
  @Get("me")
  async getMee(@AuthUser() user: UserEntity) {
    const userDto: GetMeResponseDto = GetMeResponseDto.new(user);
    return CoreApiResponse.success(userDto);
  }
}
