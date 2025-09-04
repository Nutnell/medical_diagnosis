// medical-diagnosis-backend/src/diagnosis/diagnosis.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { CheckSymptomsDto } from './dto/check-symptoms.dto';

@Injectable()
export class DiagnosisService {
  private aiServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const url = this.configService.get<string>('AI_SERVICE_URL');
    if (!url) {
      throw new Error(
        'AI_SERVICE_URL is not defined in the environment variables.',
      );
    }
    this.aiServiceUrl = url;
  }

  async getAIDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<any> {
    try {
      // Make a POST request to the Python AI microservice's /diagnose endpoint
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.aiServiceUrl}/diagnose`,
          createDiagnosisDto,
        ),
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error communicating with AI service:', error.message);
      } else {
        console.error('Error communicating with AI service:', error);
      }
      throw new InternalServerErrorException(
        'Failed to communicate with the AI service.',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  async checkPatientSymptoms(
    checkSymptomsDto: CheckSymptomsDto,
  ): Promise<CheckSymptomsDto> {
    try {
      // Make a POST request to the Python AI microservice's /symptom-checker endpoint
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.aiServiceUrl}/symptom-checker`,
          checkSymptomsDto,
        ),
      );
      return response.data as CheckSymptomsDto;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error communicating with AI service:', error.message);
      } else {
        console.error('Error communicating with AI service:', error);
      }
      throw new InternalServerErrorException(
        'Failed to communicate with the AI service.',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
