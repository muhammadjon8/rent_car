import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'User ordering a rent car' })
  user_id: number;

  @ApiProperty({ example: 1, description: 'Car being rented' })
  car_id: number;

  @ApiProperty({ example: '2022-01-01', description: 'Start date of renting' })
  start_date: Date;

  @ApiProperty({ example: '2022-01-02', description: 'End date of renting' })
  end_date: Date;

  @ApiProperty({ example: 5, description: 'Number of hours rented, put if you are ordering no more than one day' })
  hours_rented: number;
}
