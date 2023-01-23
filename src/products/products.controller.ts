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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/auth/decorator/role.decorator';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/core/enums/userRoles.enum';
import { IPositiveRequest } from 'src/core/types/main';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

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
  @Get(':productId')
  async findOne(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<ProductEntity> {
    return this.productsService.findOne(productId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update one product' })
  @ApiBody({ type: UpdateProductDto })
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
  @Roles(Role.Admin)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':productId')
  async remove(
    @Param('productId', IdValidationPipe) productId: string,
  ): Promise<IPositiveRequest> {
    return this.productsService.remove(productId);
  }
}
