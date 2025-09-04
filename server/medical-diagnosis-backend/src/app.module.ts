import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';

// Import your User schema so we can sync indexes
import { User, UserSchema, UserDocument } from './users/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config available everywhere
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Register User model for sync
    AuthModule,
    UsersModule,
    PatientsModule,
    DiagnosisModule, // Add the DiagnosisModule here to register it
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('🔄 Syncing MongoDB indexes with schema...');
    await this.userModel.syncIndexes(); // Drops stale indexes, creates missing ones
    console.log(' Indexes synced!');
  }
}
