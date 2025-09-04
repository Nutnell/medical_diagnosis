// medical-diagnosis-backend/src/diagnosis/dto/create-diagnosis.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDiagnosisDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;
}
