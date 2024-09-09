import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  car_id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column()
  created_at: Date;
}
