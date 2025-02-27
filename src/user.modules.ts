import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdercartModule } from './ordercart/ordercart.module';




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
        logging: true,
      }),
      inject: [ConfigService],
    }),
    OrdercartModule],
})
export class CustomerUserModule {}


