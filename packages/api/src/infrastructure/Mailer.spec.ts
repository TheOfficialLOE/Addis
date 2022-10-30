import { Mailer } from "@api/infrastructure/Mailer";
import { ApiKeys } from "@api/infrastructure/ApiKeys";

describe("Mailer", () => {
  let mailer: Mailer;

  beforeAll(() => {
    mailer = Mailer.build({
      service: ApiKeys.MAIL_SERVICE,
      host: ApiKeys.MAIL_HOST,
      auth: {
        user: ApiKeys.MAIL_USER,
        pass: ApiKeys.MAIL_PASS,
      },
    });
  })

  it("should create an instance of Mailer", () => {
    expect(mailer).toBeDefined();
  });

  it("should send an email", async () => {
    await expect(
      mailer.sendMail("me@me.com", "hey me")
    ).resolves.not.toThrow();
  }, 30000);
});
