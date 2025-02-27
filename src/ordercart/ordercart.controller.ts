import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdercartService } from './ordercart.service';
import { CreateOrderCartDto, deleteOrderCartDto } from './Dto/order-cart.dto';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/hooks/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ordercart')
export class OrdercartController {
    constructor(
        private readonly orderService:OrdercartService
    ){}

    @UseGuards(AuthGuard)
    @Roles(2)
    @ApiBearerAuth('userBearerAuth')
     @Post('/addOrderCart')
     async addOrderCart(@Body() orderCartdto:CreateOrderCartDto, @Req() request:AuthenticatedRequest){
        const userid = Number(request.user?.id)
        return await this.orderService.addOrderCart(orderCartdto,userid)
     }

    @Get('/getOrder')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('userBearerAuth')
    @Roles(2)
    async getOrder(@Req() request:AuthenticatedRequest){
        const userId = request.user?.id
        if (!userId || isNaN(Number(userId))) {
            throw new BadRequestException('Invalid or missing userId');
        }
        return await this.orderService.getOrder(userId)
    }

    @UseGuards(AuthGuard)
    @Roles(2)
    @ApiBearerAuth('userBearerAuth')
    @Post('/deleteOrder')
    async deleteOrder(@Body() orderdto:deleteOrderCartDto){ 
        return this.orderService.deleteOrderCart(orderdto.orderId)
    }
}       
