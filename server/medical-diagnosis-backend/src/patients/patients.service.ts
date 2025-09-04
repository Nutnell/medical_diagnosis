// medical-diagnosis-backend/src/patients/patients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  /**
   * Creates a new patient record in the database.
   */
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return createdPatient.save();
  }

  /**
   * Finds all active patients. Includes a search term for filtering.
   */
  async findAll(searchTerm?: string): Promise<Patient[]> {
    const query = { active: true };
    if (searchTerm) {
      // Add search logic if a search term is provided
      // This is a simple example; a real-world app might use more advanced text search
      query['$or'] = [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    return this.patientModel.find(query).exec();
  }

  /**
   * Finds a single patient by their unique ID.
   */
  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return patient;
  }

  /**
   * Updates a patient's record.
   */
  async update(id: string, updatePatientDto: any): Promise<Patient> {
    const existingPatient = await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();

    if (!existingPatient) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return existingPatient;
  }

  /**
   * Deactivates a patient record by setting 'active' to false.
   * This is safer than permanent deletion.
   */
  async deactivate(id: string): Promise<{ message: string }> {
    const result = await this.patientModel.updateOne({ _id: id }, { active: false }).exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException(`Patient with ID "${id}" not found`);
    }
    return { message: `Patient with ID "${id}" deactivated successfully.` };
  }
}

