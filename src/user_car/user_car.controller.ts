import { Controller, Get, Param, Delete, Req } from '@nestjs/common';
import { UserCarService } from './user_car.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('user-car')
@Controller('user-car')
export class UserCarController {
  constructor(private readonly userCarService: UserCarService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all user-car relationships' })
  @ApiResponse({
    status: 200,
    description: 'List of user-car relationships.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async findAll() {
    return this.userCarService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user-car relationship by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user-car relationship',
  })
  @ApiResponse({
    status: 200,
    description: 'The user-car relationship with the specified ID.',
  })
  @ApiNotFoundResponse({ description: 'UserCar not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async findOne(@Param('id') id: string) {
    return this.userCarService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user-car relationship by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the user-car relationship',
  })
  @ApiResponse({
    status: 204,
    description: 'The user-car relationship has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'UserCar not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async remove(@Param('id') id: string) {
    return this.userCarService.remove(+id);
  }
}
