import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // This line protects all routes in this controller
@Controller('fhir/Patient')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: any) {
    // A more specific DTO would be used here in a full implementation
    return this.patientsService.update(id, updatePatientDto);
  }
}
