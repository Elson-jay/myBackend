import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomerUserModule } from './user.modules';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { InventoryModule } from './inventory/inventory.module';
import { PosModule } from './pos/pos.module';
import { VendorModule } from './vendor/vendor.module';
import { OrdercartModule } from './ordercart/ordercart.module';
import { UserpurchaseModule } from './userpurchase/userpurchase.module';
import { UserProductModule } from './user-product/user-product.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'adminBearerAuth',
    )
    .build();

  const userConfig = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User API Documentation')
    .setVersion('1.0')

    .addBearerAuth(
      {
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'userBearerAuth',
    )
    .build();


  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [ProductModule,LoginModule,CategoryModule,PurchaseModule,InventoryModule,PosModule,VendorModule], 
  });
  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [CustomerUserModule,OrdercartModule,LoginModule,UserpurchaseModule,UserProductModule],
  });

  SwaggerModule.setup('appta/admin', app, adminDocument);
  SwaggerModule.setup('appta/user', app, userDocument);


  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });


  await app.listen(process.env.PORT ?? 4040, '0.0.0.0');
}

bootstrap();
