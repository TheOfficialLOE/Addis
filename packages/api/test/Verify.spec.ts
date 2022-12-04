import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter";
import { VerifyOtpUseCaseImpl } from "@api/modules/auth/usecases/verify/VerifyOtpUseCaseImpl";
import { OtpRepository } from "@api/modules/auth/database/otp/OtpRepository";
import { OtpMapper } from "@api/modules/auth/database/otp/OtpMapper";
import { getModelToken } from "@nestjs/mongoose";
import { OtpSchema } from "@api/modules/auth/database/otp/OtpSchema";
import { OtpEntity } from "@api/modules/auth/domain/otp/OtpEntity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { OtpVerifiedEvent } from "@api/modules/auth/domain/events/OtpVerifiedEvent";

describe("Verify", () => {
  let otpRepository: OtpRepository;
  let verifyOtpUseCase: VerifyOtpUseCaseImpl;
  let eventEmitter: EventEmitter2;
  let jwtService: JwtService;

  const mockOtp = OtpEntity.generateFor("john.doe@example.com");

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        JwtModule.register({
          secret: "secret"
        }),
      ],
      providers: [
        VerifyOtpUseCaseImpl,
        OtpRepository,
        OtpMapper,
        {
          provide: getModelToken(OtpSchema.name),
          useValue: {}
        },
      ]
    }).compile();

    verifyOtpUseCase = module.get(VerifyOtpUseCaseImpl);
    otpRepository = module.get(OtpRepository);
    eventEmitter = module.get(EventEmitter2);
    jwtService = module.get(JwtService);
  });

  it("should throw when otp not found", async () => {
    jest.spyOn(otpRepository, "findOne").mockImplementationOnce(async () => undefined);
    await expect(async () => {
      await verifyOtpUseCase.execute({
      email: "john.doe@example.com",
      code: 1234
    })
    }).rejects.toThrow();
  });

  it("should throw if fails to verify the otp", async () => {
    jest.spyOn(otpRepository, "findOne").mockImplementationOnce(async () => mockOtp);
    /// todo: actual check
    jest.spyOn(mockOtp, "verify").mockImplementationOnce(() => {
      throw new Error("Invalid OTP.");
    });
    await expect(async () => {
      await verifyOtpUseCase.execute({
        email: "john.doe@example.com",
        code: 1234
      });
    }).rejects.toThrow();
  });

  it("should call the otp.verified event", async () => {
    const spy = jest.fn();
    eventEmitter.on("otp.verified", spy);
    jest.spyOn(otpRepository, "findOne").mockImplementationOnce(async () => mockOtp);
    await verifyOtpUseCase.execute({
      email: "john.doe@example.com",
      code: 1234
    });
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalledWith(new OtpVerifiedEvent("john.doe@example.com"));
  });

  it("should create a token with the email payload", async () => {
    jest.spyOn(otpRepository, "findOne").mockImplementationOnce(async () => mockOtp);
    const token = await verifyOtpUseCase.execute({
      email: "john.doe@example.com",
      code: 1234
    });
    expect(token).toBeDefined();
    expect(jwtService.verify(token).email).toBe(mockOtp.issuedEmail);
  });
});
