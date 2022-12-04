import { RepositoryPort } from "@api/core/base-classes/RepositoryPort";
import { OtpSchema } from "@api/modules/auth/database/otp/OtpSchema";
import { OtpEntity } from "@api/modules/auth/domain/otp/OtpEntity";

export interface OtpRepositoryPort extends RepositoryPort<OtpSchema, OtpEntity> {

}
