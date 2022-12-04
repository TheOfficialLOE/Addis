import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@api/core/guards/JwtAuthGuard";

export const IsAuthentic = () => (
  applyDecorators(
    UseGuards(JwtAuthGuard)
  )
)
