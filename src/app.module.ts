import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { InventoryModule } from './inventory/inventory.module';
import { PosModule } from './pos/pos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { StatusModule } from './status/status.module';
import { VendorModule } from './vendor/vendor.module';
import { LoginModule } from './login/login.module';
import { CustomerModule } from './customer/customer.module';
import { OrdercartModule } from './ordercart/ordercart.module';
import { UserpurchaseModule } from './userpurchase/userpurchase.module';
import { UserProductModule } from './user-product/user-product.module';


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
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'postgres',
        password: configService.get('DB_PASSWORD') || '1234',
        database: configService.get('DB_DATABASE')|| 'apptaclone',
        autoLoadEntities: true,
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    ProductModule, PurchaseModule, InventoryModule, PosModule, CategoryModule, StatusModule, VendorModule, LoginModule, CustomerModule, OrdercartModule, UserpurchaseModule, UserProductModule],
})
export class AppModule {}


