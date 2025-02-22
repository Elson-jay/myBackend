import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from './entity/StatusEntity';

@Module({
  imports:[TypeOrmModule.forFeature([StatusEntity])],
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
