import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsIn,
} from 'class-validator';

// This DTO should mirror the fields from your frontend's 'New Patient' form.
export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'other', 'unknown'])
  gender: string;

  // You can add more validation for complex fields as needed
  @IsOptional()
  telecom?: any[];

  @IsOptional()
  address?: any[];
}
