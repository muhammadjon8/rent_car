import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../user/entities/user.entity';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>,
  ) {}

  async create(car_id: number, createReviewDto: CreateReviewDto) {
    const user = await this.userRepo.findOne({
      where: { id: createReviewDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const car = await this.carRepo.findOne({
      where: { id: car_id },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const rating = createReviewDto.rating;
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      car_id,
      created_at: new Date(), // Set created_at to the current date
    });

    return this.reviewRepository.save(review);
  }

  async findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: number) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id },
      });
      if (!review) {
        throw new NotFoundException(`Review with ID ${id} not found`);
      }
      return review;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewRepository.update({ id }, updateReviewDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const reviewToRemove = await this.findOne(id);
    if ('error' in reviewToRemove) {
      // Review not found, return the error
      return reviewToRemove;
    }
    return this.reviewRepository.remove([reviewToRemove]);
  }
}
