import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

// This schema defines the structure of a patient document in the MongoDB collection.
// It includes the core fields from your frontend form and an 'active' flag for our deactivation feature.
@Schema({ timestamps: true, collection: 'patients' })
export class Patient {
  @Prop({ required: true })
  firstName!: string;

  @Prop()
  middleName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  dateOfBirth!: string;

  @Prop({ required: true })
  gender!: string;

  // Storing as a flexible object array to be FHIR-like
  @Prop({ type: Array })
  telecom!: any[];

  // Storing as a flexible object array to be FHIR-like
  @Prop({ type: Array })
  address!: any[];

  // This field is crucial for our 'deactivate' functionality instead of permanent deletion.
  @Prop({ default: true })
  active!: boolean;

  // We can add more complex, typed fields for other clinical data later.
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
