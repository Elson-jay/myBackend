import { Controller, Get, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './entity/InventoryEntity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService:InventoryService,
    ){}

    @Get('/getInventory')
    @ApiBearerAuth('adminBearerAuth')
    @UseGuards(AuthGuard)
    async getInventory():Promise<InventoryEntity[]>{
        return this.inventoryService.getInventory();
    }
}
