import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entity/CustomerEnity';

@Module({
  imports:[TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
