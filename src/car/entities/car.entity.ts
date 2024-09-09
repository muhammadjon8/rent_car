import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCar } from '../../user_car/entities/user_car.entity';

@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  marka: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  manufacture_date: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  price_per_hour: number;

  @Column({ nullable: true })
  price_per_day: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  car_condition: string;

  @Column({ nullable: true })
  korobka: string;

  @Column({ nullable: true })
  full_fuel: string;

  @OneToMany(() => UserCar, (userCar) => userCar.car)
  userCars: UserCar[];

  @Column({ nullable: true })
  userId: number;
}
