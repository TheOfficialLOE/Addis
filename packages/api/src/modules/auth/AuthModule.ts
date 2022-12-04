import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SignInController } from "@api/modules/auth/usecases/sign-in/SignInController";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { OtpMapper } from "@api/modules/auth/database/otp/OtpMapper";
import { OtpRepository } from "@api/modules/auth/database/otp/OtpRepository";
import { SignInUseCaseImpl } from "@api/modules/auth/usecases/sign-in/SignInUseCaseImpl";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { VerifyOtpUseCaseImpl } from "@api/modules/auth/usecases/verify/VerifyOtpUseCaseImpl";
import { VerifyOtpController } from "@api/modules/auth/usecases/verify/VerifyOtpController";
import { GetMeController } from "@api/modules/auth/usecases/get-me/GetMeController";
import { JwtStrategy } from "@api/core/strategies/JwtStrategy";
import { UserSignedInEventListener } from "@api/modules/auth/usecases/sign-in/UserSignedInEventListener";
import { OtpVerifiedEventListener } from "@api/modules/auth/usecases/verify/OtpVerifiedEventListener";
import { ApiKeys } from "@api/infrastructure/config/ApiKeys";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    JwtModule.register({
      secret: ApiKeys.JWT_SECRET
    }),
  ],
  controllers: [
    SignInController,
    VerifyOtpController,
    GetMeController,
  ],
  providers: [
    SignInUseCaseImpl,
    VerifyOtpUseCaseImpl,
    UserRepository,
    UserMapper,
    OtpRepository,
    OtpMapper,
    UserSignedInEventListener,
    OtpVerifiedEventListener,
    JwtStrategy
  ],
  exports: [
    UserMapper,
    UserRepository
  ]
})
export class AuthModule {}
