import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The ID of the user providing the review',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'The comment provided by the user',
    example: 'Great car, very comfortable!',
  })
  comment: string;

  @ApiProperty({
    description: 'The rating given by the user (1 to 5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  rating: number;
}
