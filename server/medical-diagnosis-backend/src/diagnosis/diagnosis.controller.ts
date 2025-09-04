// medical-diagnosis-backend/src/diagnosis/diagnosis.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { CheckSymptomsDto } from './dto/check-symptoms.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @UseGuards(JwtAuthGuard) // Secure this endpoint for doctors
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    // Endpoint for the main AI Diagnostic Assistant
    return this.diagnosisService.getAIDiagnosis(createDiagnosisDto);
  }

  // The patient-facing symptom checker can be a separate endpoint
  @Post('symptom-checker')
  checkSymptoms(@Body() checkSymptomsDto: CheckSymptomsDto) {
    return this.diagnosisService.checkPatientSymptoms(checkSymptomsDto);
  }
}
