import { get } from "env-var";

export class ApiKeys {
  public static readonly MAIL_SERVICE: string = get("MAIL_SERVICE").required().asString();

  public static readonly MAIL_HOST: string = get("MAIL_HOST").required().asString();

  public static readonly MAIL_USER: string = get("MAIL_USER").required().asString();

  public static readonly MAIL_PASS: string = get("MAIL_PASS").required().asString();
}
