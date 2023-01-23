import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PaginateOrdersItemDto } from './dto/paginate-orders-item.dto';

import { UserEntity } from 'src/users/entities/user.entity';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderItemService } from './orderItem.service';
import { OrderItemEntity } from './entities/orderItem.entity';
import { User } from 'src/users/decorator/user.decorator';
import { IPositiveRequest } from 'src/core/types/main';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';

@ApiTags('Order item')
@Controller('orderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create order' })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product is not enough',
  })
  @UseGuards(JWTAuthGuard)
  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<IPositiveRequest> {
    console.log(createOrderItemDto);

    return this.orderItemService.create(user, createOrderItemDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Find user orders' })
  @UseGuards(JWTAuthGuard)
  @Get()
  async findUserOrders(
    @User() user: UserEntity,
    @Query() paginateOrdersItemDto: PaginateOrdersItemDto,
  ): Promise<Array<OrderItemEntity>> {
    return this.orderItemService.findAllPaginate(
      paginateOrdersItemDto,
      user.id,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Find user orders for admin' })
  @UseGuards(JWTAuthGuard)
  @Get('admin/:userId')
  async findUsersOrdersAdmin(
    @Param('userId', IdValidationPipe) userId: string,
    @Query() paginateOrdersItemDto: PaginateOrdersItemDto,
  ): Promise<Array<OrderItemEntity>> {
    return this.orderItemService.findAllPaginate(paginateOrdersItemDto, userId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Find one order' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderItemEntity,
    isArray: true,
  })
  @UseGuards(JWTAuthGuard)
  @Get(':orderItemId')
  async findOne(
    @Param('orderItemId', IdValidationPipe) orderItemId: string,
  ): Promise<OrderItemEntity> {
    return this.orderItemService.findOne(orderItemId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update one order item' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product is not enough',
  })
  @UseGuards(JWTAuthGuard)
  @Patch(':orderItemId')
  async update(
    @Param('orderItemId', IdValidationPipe) orderItemId: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<IPositiveRequest> {
    return this.orderItemService.update(orderItemId, updateOrderItemDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete one order item' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order is not exist',
  })
  @UseGuards(JWTAuthGuard)
  @Delete(':orderItemId')
  async remove(
    @Param('orderItemId', IdValidationPipe) orderItemId: string,
  ): Promise<IPositiveRequest> {
    return this.orderItemService.remove(orderItemId);
  }
}
