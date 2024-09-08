import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/entities/admin.entity';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { UserCarModule } from './user_car/user_car.module';
import { UserCar } from './user_car/entities/user_car.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Admin, User, Car, UserCar],
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    CarModule,
    UserCarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
