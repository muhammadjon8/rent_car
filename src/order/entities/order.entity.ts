import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  car_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  hours_rented: number;

  @Column()
  status: string;
}
