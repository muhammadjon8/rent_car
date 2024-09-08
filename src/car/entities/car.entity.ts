import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCar } from '../../user_car/entities/user_car.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  markasi: string;

  @Column()
  model: string;

  @Column()
  manufacture_date: string;

  @Column()
  color: string;

  @Column()
  price_per_hour: number;

  @Column()
  price_per_day: number;

  @Column()
  location: string;

  @Column()
  car_condition: string;

  @Column()
  korobka: string;

  @Column()
  full_fuel: string;

  @OneToMany(() => UserCar, (userCar) => userCar.car)
  userCars: UserCar[];

  @Column({ nullable: true })
  userId: number;
}
