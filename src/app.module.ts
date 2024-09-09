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
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
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
      entities: [Admin, User, Car, UserCar, Order, Review],
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    CarModule,
    UserCarModule,
    OrderModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
