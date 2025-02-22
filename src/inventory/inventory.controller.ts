import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './entity/InventoryEntity';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService:InventoryService,
    ){}

    @Get('/getInventory')
    async getInventory():Promise<InventoryEntity[]>{
        return this.inventoryService.getInventory();
    }
}
