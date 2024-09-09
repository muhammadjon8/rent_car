import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserGuard } from '../admin/guards/user.guard';
import { Request } from 'express';
import { Car } from './entities/car.entity';
import { AdminGuard } from '../admin/guards/admin.guard';

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
  create(@Body() createCarDto: CreateCarDto, @Req() req: Request) {
    return this.carService.create(createCarDto, req);
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

  @ApiQuery({
    name: 'model',
    required: true,
    description: 'The car model to search for',
  }) // Describes the query parameter
  @ApiResponse({
    status: 200,
    description: 'List of cars matching the model',
    type: [Car],
  }) // Successful response description
  @ApiResponse({
    status: 404,
    description: 'No cars found for the given model',
  }) // 404 response description
  @Get('search/model')
  async searchByModel(@Query('model') model: string) {
    return this.carService.searchByModel(model);
  }

  @ApiQuery({
    name: 'marka',
    required: true,
    description: 'The car Marka to search for',
  }) // Describes the query parameter
  @ApiResponse({
    status: 200,
    description: 'List of cars matching the Marka',
    type: [Car],
  }) // Successful response description
  @ApiResponse({
    status: 404,
    description: 'No cars found for the given Marka',
  }) // 404 response description
  @Get('search/marka')
  async searchByMarka(@Query('marka') marka: string) {
    return this.carService.searchByMarka(marka);
  }

  @ApiQuery({
    name: 'location',
    required: true,
    description: 'The car location to search for',
  }) // Describes the query parameter
  @ApiResponse({
    status: 200,
    description: 'List of cars matching the location',
    type: [Car],
  }) // Successful response description
  @ApiResponse({
    status: 404,
    description: 'No cars found for the given location',
  }) // 404 response description
  @Get('search/location')
  async searchByLocation(@Query('location') location: string) {
    return this.carService.searchByLocation(location);
  }

  @ApiQuery({
    name: 'color',
    required: true,
    description: 'The car color to search for',
  }) // Describes the query parameter
  @ApiResponse({
    status: 200,
    description: 'List of cars matching the color',
    type: [Car],
  }) // Successful response description
  @ApiResponse({
    status: 404,
    description: 'No cars found for the given color',
  }) // 404 response description
  @Get('search/color')
  async searchByColor(@Query('color') color: string) {
    return this.carService.searchByColor(color);
  }
}
