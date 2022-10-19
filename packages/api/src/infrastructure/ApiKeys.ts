import { get } from "env-var";

export class ApiKeys {
  public static readonly MAIL_SERVICE: unique symbol = Symbol(
    get("MAIL_SERVICE").required().asString(),
  );

  public static readonly MAIL_HOST: unique symbol = Symbol(
    get("MAIL_HOST").required().asString(),
  );

  public static readonly MAIL_USER: unique symbol = Symbol(
    get("MAIL_USER").required().asString(),
  );

  public static readonly MAIL_PASS: unique symbol = Symbol(
    get("MAIL_PASS").required().asString(),
  );
}
