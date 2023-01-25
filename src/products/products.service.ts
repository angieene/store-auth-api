import { Injectable } from '@nestjs/common';

import { IPositiveRequest } from 'src/core/types/main';

import { CreateProductDto } from './dto/create-product.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<IPositiveRequest> {
    return this.productRepository.create(createProductDto);
  }

  async findAllPaginate(
    paginateProductsDto: PaginateProductsDto,
  ): Promise<Array<ProductEntity>> {
    return this.productRepository.findAllPaginate(paginateProductsDto);
  }

  async findOne(productId: string) {
    return this.productRepository.findOne(productId);
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IPositiveRequest> {
    return this.productRepository.update(productId, updateProductDto);
  }

  async updateStock(
    productId: string,
    newStock: number,
  ): Promise<IPositiveRequest> {
    return this.productRepository.updateStock(productId, newStock);
  }

  async remove(productId: string): Promise<IPositiveRequest> {
    return this.productRepository.remove(productId);
  }
}
