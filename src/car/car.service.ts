import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity'; // Assuming you have a Car entity
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const car = this.carRepository.create(createCarDto);
      return this.carRepository.save(car);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    try {
      const car = await this.carRepository.find();
      return car;
    } catch (error) {
      console.error('Error getting car:', error);
      throw new Error('Failed to get car');
    }
  }

  async findOne(id: number) {
    try {
      const car = await this.carRepository.findOne({
        where: { id },
      });
      if (!car) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }
      return car;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    try {
      await this.carRepository.update({ id }, updateCarDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const carToRemove = await this.findOne(id);
    if ('error' in carToRemove) {
      // Car not found, return the error
      return carToRemove;
    }
    return this.carRepository.remove([carToRemove]);
  }
}
