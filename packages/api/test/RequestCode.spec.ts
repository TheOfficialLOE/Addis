import { Test, TestingModule } from "@nestjs/testing";
import { OtpSchema } from "@api/modules/identity-and-access/database/OtpSchema";
import { getModelToken } from "@nestjs/mongoose";
import { OtpMapper } from "@api/modules/identity-and-access/database/OtpMapper";
import { OtpRepository } from "@api/modules/identity-and-access/database/OtpRepository";

describe("RequestCode", () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpRepository,
        {
          provide: getModelToken(OtpSchema.name),
          useValue: {}
        },
        OtpMapper,
      ]
    }).compile();
  });

  it("should ...", async () => {
    console.log("...");
  });
});
