import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  refreshToken: string;
}
