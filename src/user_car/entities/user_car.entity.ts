import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../car/entities/car.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserCar {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCars, { eager: true }) // Load related user eagerly
  user: User;

  @ManyToOne(() => Car, (car) => car.userCars, { eager: true }) // Load related car eagerly
  car: Car;

  @Column()
  userId: number;

  @Column()
  carId: number;
}
