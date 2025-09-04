// medical-diagnosis-backend/src/diagnosis/dto/check-symptoms.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckSymptomsDto {
  @IsString()
  @IsNotEmpty()
  symptoms!: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  severity?: string;
}
