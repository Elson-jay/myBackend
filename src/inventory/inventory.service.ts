import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './entity/InventoryEntity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository:Repository<InventoryEntity>,
    ){}

    async getInventory():Promise<InventoryEntity[]>{
        return await this.inventoryRepository.find();
    };
}
