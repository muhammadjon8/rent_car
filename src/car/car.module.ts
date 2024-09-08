import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserCar } from '../user_car/entities/user_car.entity';
import { UserCarService } from '../user_car/user_car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, UserCar]),
    JwtModule.register({}),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
