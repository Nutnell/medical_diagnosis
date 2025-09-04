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
      return response.data as any;
    } catch (error) {
      console.error('Error communicating with AI service:', error.message);
      throw new InternalServerErrorException('Failed to communicate with the AI service.');
    }
  }

  async checkPatientSymptoms(checkSymptomsDto: CheckSymptomsDto): Promise<CheckSymptomsDto> {
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
      console.error('Error communicating with AI service:', error.message);
      throw new InternalServerErrorException('Failed to communicate with the AI service.');
    }
  }
}
