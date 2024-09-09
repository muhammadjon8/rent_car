import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Brand of the car', example: 'Toyota' })
  marka: string;

  @ApiProperty({ description: 'Model of the car', example: 'Corolla' })
  model: string;

  @ApiProperty({
    description: 'Manufacture date of the car',
    example: '2021-01-01',
  })
  manufacture_date: string;

  @ApiProperty({ description: 'Color of the car', example: 'Red' })
  color: string;

  @ApiProperty({ description: 'Price per hour in USD', example: 10 })
  price_per_hour: number;

  @ApiProperty({ description: 'Price per day in USD', example: 50 })
  price_per_day: number;

  @ApiProperty({ description: 'Location of the car', example: 'Tashkent' })
  location: string;

  @ApiProperty({ description: 'Condition of the car', example: 'New' })
  car_condition: string;

  @ApiProperty({ description: 'Transmission type', example: 'Automatic' })
  korobka: string;

  @ApiProperty({
    description: 'Fuel type of the car',
    example: 'petrol',
    enum: ['petrol', 'gas', 'electro'],
  })
  full_fuel: string;
}
