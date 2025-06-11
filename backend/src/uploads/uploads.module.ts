import { Module } from '@nestjs/common';
import { UploadsResolver } from './uploads.resolver';
import { UploadsService } from './uploads.service';

@Module({
  providers: [UploadsResolver, UploadsService]
})
export class UploadsModule {}
