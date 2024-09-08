import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserGuard } from '../admin/guards/user.guard';

@ApiTags('car') // Adds the 'car' tag in Swagger UI
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(UserGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new car' }) // Describes the endpoint
  @ApiResponse({
    status: 201,
    description: 'The car has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @UseGuards(UserGuard)
  @Get()
  @ApiOperation({ summary: 'Get a list of all cars' })
  @ApiResponse({
    status: 200,
    description: 'List of cars retrieved successfully.',
  })
  findAll() {
    return this.carService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific car' })
  @ApiResponse({
    status: 200,
    description: 'Car details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific car' })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific car' })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
