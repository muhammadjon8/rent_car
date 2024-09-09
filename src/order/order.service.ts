import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../car/entities/car.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';
import { UpdateCarDto } from '../car/dto/update-car.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userCarRepo: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const car = await this.carRepository.findOne({
      where: { id: createOrderDto.car_id },
    });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const user = await this.userCarRepo.findOne({
      where: { id: createOrderDto.user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check for date conflicts
    const orderStartDate = new Date(createOrderDto.start_date);
    const orderEndDate = new Date(createOrderDto.end_date);

    const bookedDaysStart = new Date(car.booked_days_from);
    const bookedDaysEnd = new Date(car.booked_days_to);

    // Check if the order dates overlap with booked days
    if (orderStartDate <= bookedDaysEnd && orderEndDate >= bookedDaysStart) {
      throw new Error('These days are already booked');
    }

    // Calculate total cost
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const daysRented = Math.ceil(
      (orderEndDate.getTime() - orderStartDate.getTime()) / oneDay,
    );
    let total = daysRented * car.price_per_day;

    if (daysRented === 0 && createOrderDto.hours_rented) {
      total = createOrderDto.hours_rented * car.price_per_hour;
    }

    // Check user balance
    const minusBalance = user.balance - total;
    if (minusBalance < 0) {
      throw new Error('Insufficient balance');
    }

    user.balance = minusBalance;
    await this.userCarRepo.save(user);

    // Create and save the new order
    const newOrder = this.orderRepo.create(createOrderDto);
    await this.orderRepo.save({ ...newOrder, status: 'success' });

    return {
      order: newOrder,
      total: total,
      status: 'success',
    };
  }

  async findAll() {
    try {
      const orders = await this.orderRepo.find();
      return orders;
    } catch (error) {
      console.error('Error getting car:', error);
      throw new Error('Failed to get car');
    }
  }
  async findOne(id: number) {
    try {
      const order = await this.orderRepo.findOne({
        where: { id },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      await this.orderRepo.update({ id }, updateOrderDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const orderToRemove = await this.findOne(id);
    if ('error' in orderToRemove) {
      // Car not found, return the error
      return orderToRemove;
    }
    return this.orderRepo.remove([orderToRemove]);
  }
}
