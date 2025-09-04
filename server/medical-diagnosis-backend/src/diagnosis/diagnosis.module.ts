// medical-diagnosis-backend/src/diagnosis/diagnosis.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule, // To make external API calls to the Python service
    ConfigModule, // To access environment variables like AI_SERVICE_URL
    AuthModule, // To use our JwtAuthGuard
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
