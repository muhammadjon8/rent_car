import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity'; // Assuming you have a Car entity
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtService } from '@nestjs/jwt';
import { UserCar } from '../user_car/entities/user_car.entity';
import { Request } from 'express';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserCar)
    private readonly userCarRepo: Repository<UserCar>,
  ) {}

  async create(createCarDto: CreateCarDto, req: any) {
    try {
      // Step 1: Extract and verify the token from cookies
      const token = req.cookies['refresh_token']; // Replace 'auth-token' with the actual key you're using
      if (!token) {
        throw new UnauthorizedException('No authentication token provided');
      }

      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const userId = decodedToken.id; // Extract user ID from the token
      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      // Step 2: Create and save the car
      const car = this.carRepository.create(createCarDto);
      const savedCar = await this.carRepository.save({
        ...car, // Set car
        userId: userId, // Set user ID
      });

      // Step 3: Save the user-car relationship (assuming you have a UserCar entity)
      await this.userCarRepo.save({
        userId: userId, // Store user ID
        carId: savedCar.id, // Store car ID
      });

      return savedCar; // Return the created car
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

  async searchByModel(model: string) {
    try {
      const cars = await this.carRepository
        .createQueryBuilder('car')
        .where('LOWER(car.model) LIKE LOWER(:model)', { model: `%${model}%` })
        .getMany();

      if (cars.length === 0) {
        throw new NotFoundException(`No cars found with the model "${model}"`);
      }
      return cars;
    } catch (error) {
      console.error('Error searching for cars:', error);
      throw new NotFoundException('Failed to search for cars');
    }
  }

  async searchByMarka(marka: string) {
    try {
      const cars = await this.carRepository
        .createQueryBuilder('car')
        .where('LOWER(car.marka) LIKE LOWER(:marka)', { markasi: `%${marka}%` })
        .getMany();

      if (cars.length === 0) {
        throw new NotFoundException(`No cars found with the marka "${marka}"`);
      }
      return cars;
    } catch (error) {
      console.error('Error searching for cars:', error);
      throw new NotFoundException('Failed to search for cars');
    }
  }
  async searchByLocation(location: string) {
    try {
      const cars = await this.carRepository
        .createQueryBuilder('car')
        .where('LOWER(car.location) LIKE LOWER(:location)', {
          location: `%${location}%`,
        })
        .getMany();

      if (cars.length === 0) {
        throw new NotFoundException(
          `No cars found with the location "${location}"`,
        );
      }
      return cars;
    } catch (error) {
      console.error('Error searching for cars:', error);
      throw new NotFoundException('Failed to search for cars');
    }
  }

  async searchByColor(color: string) {
    try {
      const cars = await this.carRepository
        .createQueryBuilder('car')
        .where('LOWER(car.color) LIKE LOWER(:color)', {
          color: `%${color}%`,
        })
        .getMany();

      if (cars.length === 0) {
        throw new NotFoundException(
          `No cars found with the color "${color}"`,
        );
      }
      return cars;
    } catch (error) {
      console.error('Error searching for cars:', error);
      throw new NotFoundException('Failed to search for cars');
    }
  }
  
}
