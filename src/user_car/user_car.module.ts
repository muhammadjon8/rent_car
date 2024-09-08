import { Module } from '@nestjs/common';
import { UserCarService } from './user_car.service';
import { UserCarController } from './user_car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCar } from './entities/user_car.entity';
import { Car } from '../car/entities/car.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCar, Car, User])],
  controllers: [UserCarController],
  providers: [UserCarService],
})
export class UserCarModule {}
