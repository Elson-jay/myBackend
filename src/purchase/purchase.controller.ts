import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './Dto/PurchaseDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/hooks/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('purchase')
export class PurchaseController {
    constructor(
        private readonly purchaseServer:PurchaseService,
    ){}

    @Post("/addPurchase")
    @UseGuards(AuthGuard)
    @ApiBearerAuth('adminBearerAuth')
    @Roles(1)
    async addPurchase(@Body() purchaseDto:PurchaseDto){
        return await this.purchaseServer.addPurchase(purchaseDto)
    }

    @Get("/getPurchase")
    @ApiBearerAuth('adminBearerAuth')
    @UseGuards(AuthGuard)
    @Roles(1)
    async getPurchase(){
        return await this.purchaseServer.getPurchaseList();
    }
}
