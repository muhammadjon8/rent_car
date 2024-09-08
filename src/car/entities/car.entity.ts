import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
