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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';

import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/core/enums/userRoles.enum';
import { ProductEntity } from './entities/product.entity';
import { IPositiveRequest } from 'src/core/types/main';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create product' })
  @ApiBody({ type: CreateProductDto })
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Post('admin')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<IPositiveRequest> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductEntity,
    isArray: true,
  })
  @Get()
  async findAllPaginate(
    @Query() paginateProductDto: PaginateProductsDto,
  ): Promise<Array<ProductEntity>> {
    return this.productsService.findAllPaginate(paginateProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get one product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductEntity,
  })
  @UsePipes(new ValidationPipe())
  @Get(':productId')
  async findOne(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<ProductEntity> {
    return this.productsService.findOne(productId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update one product' })
  @ApiBody({ type: UpdateProductDto })
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Patch(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IPositiveRequest> {
    return this.productsService.update(productId, updateProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete one product' })
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':productId')
  async remove(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<IPositiveRequest> {
    return this.productsService.remove(productId);
  }
}
