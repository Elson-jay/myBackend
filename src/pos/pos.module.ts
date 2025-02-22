import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesEntity } from './entity/SalesEntity';
import { SalesItemEntity } from './entity/SalesItemEntity';

@Module({
  imports:[TypeOrmModule.forFeature([SalesEntity,SalesItemEntity])],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}
