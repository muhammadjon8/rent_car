import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCar } from './entities/user_car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCarService {
  constructor(
    @InjectRepository(UserCar)
    private readonly userCarRepository: Repository<UserCar>,
  ) {}

  async findAll() {
    try {
      const userCar = await this.userCarRepository.find({
        relations: ['user', 'car'],
      });
      return userCar;
    } catch (error) {
      console.error('Error fetching userCar:', error);
      throw new Error('Failed to fetch userCar');
    }
  }

  async findOne(id: number) {
    try {
      const userCar = await this.userCarRepository.findOne({
        where: { id },
      });
      if (!userCar) {
        throw new NotFoundException(`UserCar with ID ${id} not found`);
      }
      return userCar;
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const userCarToRemove = await this.findOne(id);
    if ('error' in userCarToRemove) {
      // UserCar not found, return the error
      return userCarToRemove;
    }
    return this.userCarRepository.remove([userCarToRemove]);
  }
}
