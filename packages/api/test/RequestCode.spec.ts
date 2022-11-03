import { Test, TestingModule } from "@nestjs/testing";
import { OtpSchema } from "@api/modules/identity-and-access/database/OtpSchema";
import { getModelToken } from "@nestjs/mongoose";
import { OtpMapper } from "@api/modules/identity-and-access/database/OtpMapper";
import { OtpRepository } from "@api/modules/identity-and-access/database/OtpRepository";
import { RequestCodeUseCaseImpl } from "@api/modules/identity-and-access/usecases/request-code/RequestCodeUseCaseImpl";
import { RequestCodeUseCase } from "@api/modules/identity-and-access/usecases/request-code/RequestCodeUseCase";

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {  })
  })
}));

describe("RequestCode", () => {
  let requestCodeUseCase: RequestCodeUseCase;
  let otpRepository: OtpRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestCodeUseCaseImpl,
        OtpRepository,
        {
          provide: getModelToken(OtpSchema.name),
          useValue: {  }
        },
        OtpMapper,
      ]
    }).compile();

    requestCodeUseCase = module.get(RequestCodeUseCaseImpl);
    otpRepository = module.get(OtpRepository);
  });

  it("should send an otp code", async () => {
    jest.spyOn(otpRepository, "create").mockResolvedValue();
    await requestCodeUseCase.execute("me@me.com");
  });
});
