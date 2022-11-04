import { Test } from "@nestjs/testing";
import { VerifyCodeUseCaseImpl } from "@api/modules/identity-and-access/usecases/verify-code/VerifyCodeUseCaseImpl";
import { OtpRepository } from "@api/modules/identity-and-access/database/OtpRepository";
import { OtpMapper } from "@api/modules/identity-and-access/database/OtpMapper";
import { getModelToken } from "@nestjs/mongoose";
import { OtpSchema } from "@api/modules/identity-and-access/database/OtpSchema";
import { UserRepository } from "@api/modules/identity-and-access/database/UserRepository";
import { UserMapper } from "@api/modules/identity-and-access/database/UserMapper";
import { UserSchema } from "@api/modules/identity-and-access/database/UserSchema";
import { JwtModule } from "@nestjs/jwt";
import { VerifyCodeUseCase } from "@api/modules/identity-and-access/usecases/verify-code/VerifyCodeUseCase";
import { OtpEntity } from "@api/modules/identity-and-access/domain/OtpEntity";
import { UserEntity } from "@api/modules/identity-and-access/domain/UserEntity";

describe("VerifyCode", () => {
  let verifyCodeUseCase: VerifyCodeUseCase;
  let otpRepository: OtpRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: "secret"
        })
      ],
      providers: [
        VerifyCodeUseCaseImpl,
        OtpRepository,
        OtpMapper,
        {
          provide: getModelToken(OtpSchema.name),
          useValue: {}
        },
        UserRepository,
        UserMapper,
        {
          provide: getModelToken(UserSchema.name),
          useValue: {}
        }
      ]
    }).compile();

    verifyCodeUseCase = module.get(VerifyCodeUseCaseImpl);
    otpRepository = module.get(OtpRepository);
    userRepository = module.get(UserRepository);
  });

  it("should verify an otp code", async () => {
    jest.spyOn(otpRepository, "findOne").mockResolvedValue(OtpEntity.generateFor("kh"));
    jest.spyOn(userRepository, "findOne").mockResolvedValue(UserEntity.new("kh"));
    await verifyCodeUseCase.execute({ email: "kh", code: 1234 });
  });

  it("should throw when otp not found", async () => {
    jest.spyOn(otpRepository, "findOne").mockResolvedValue(undefined);
    await expect(async () => {
      await verifyCodeUseCase.execute({ email: "kh", code: 1234 });
    }).rejects.toThrow();
  });
});
