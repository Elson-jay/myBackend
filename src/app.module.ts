import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { InventoryModule } from './inventory/inventory.module';
import { PosModule } from './pos/pos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { StatusModule } from './status/status.module';
import { VendorModule } from './vendor/vendor.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [  ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ProductModule, PurchaseModule, InventoryModule, PosModule, CategoryModule, CustomerModule, StatusModule, VendorModule, LoginModule],
})
export class AppModule {}


