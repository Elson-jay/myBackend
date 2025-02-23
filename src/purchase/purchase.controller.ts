import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './Dto/PurchaseDto';

@Controller('purchase')
export class PurchaseController {
    constructor(
        private readonly purchaseServer:PurchaseService,
    ){}

    @Post("/addPurchase")
    async addPurchase(@Body() purchaseDto:PurchaseDto){
        return await this.purchaseServer.addPurchase(purchaseDto)
    }
    @Get("/getPurchase")
    async getPurchase(){
        return await this.purchaseServer.getPurchaseList();
    }
}
