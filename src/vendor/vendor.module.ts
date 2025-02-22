import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorEntity } from './entity/VendorEntity';

@Module({
  imports:[TypeOrmModule.forFeature([VendorEntity])],
  controllers: [VendorController],
  providers: [VendorService]
})
export class VendorModule {}
