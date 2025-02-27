import { BadRequestException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserpurchaseService } from './userpurchase.service';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/hooks/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteUserPurchaseDto } from './Dto/UserPurchaseDto';


@Controller('userpurchase')
export class UserpurchaseController {
    constructor(
        private readonly orderService: UserpurchaseService
    ) { }

    @Post('/addUserpurchase')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('userBearerAuth')
    @Roles(2)
    async purchase(@Req() request: AuthenticatedRequest) {
        const userId = Number(request.user?.id);
        if (!userId) throw new BadRequestException("Invalid user");

        return await this.orderService.purchaseOrder(userId);
    }

    @Post('/getUserpurchase')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('userBearerAuth')
    @Roles(2)
    async getUserPurchase(@Req() request:AuthenticatedRequest){
        const userid = request.user?.id
        const roleId = request.user?.roleId
        if (!userid) throw new BadRequestException("Invalid user");
        return await this.orderService.getUserPurchase(userid || 0, roleId || 0)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth('userBearerAuth')
    @Roles(2)
    @Post('/cancelPurchase')
    async cancelPurchase(@Body() deletePurchaseDto:DeleteUserPurchaseDto, @Req() request:AuthenticatedRequest){
        const userId = request.user?.id;
        return await this.orderService.cancelPurchase(deletePurchaseDto.purchaseId,userId||0)
    }


}
