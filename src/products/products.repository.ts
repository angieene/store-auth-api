import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPositiveRequest } from 'src/core/types/main';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IPositiveRequest> {
    const newProduct = new ProductEntity(createProductDto);

    const response = await this.productEntity.save(newProduct);

    if (!response) {
      throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { success: true };
  }

  async findAllPaginate(
    paginateProductsDto: PaginateProductsDto,
  ): Promise<Array<ProductEntity>> {
    const { pageSize, page } = paginateProductsDto;

    return this.productEntity
      .createQueryBuilder('products')
      .orderBy('products.id', 'ASC')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getMany();
  }

  async findOne(productId: string) {
    const searchProduct = await this.productEntity.findOne({
      where: { id: productId },
    });

    if (!searchProduct) {
      throw new HttpException('Product is not exist', HttpStatus.NOT_FOUND);
    }

    return searchProduct;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IPositiveRequest> {
    const searchProduct = await this.findOne(productId);

    if (!searchProduct) {
      throw new BadRequestException('Product is not exist');
    }

    searchProduct.createdAt = new Date();

    Object.assign(searchProduct, updateProductDto);
    await this.productEntity.save(searchProduct);

    return { success: true };
  }

  async updateStock(
    productId: string,
    newStock: number,
  ): Promise<IPositiveRequest> {
    const searchProduct = await this.productEntity
      .createQueryBuilder()
      .update('products')
      .set({ stock: newStock })
      .where({ id: productId })
      .execute();

    if (!searchProduct) {
      throw new HttpException(
        'Product is not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
    };
  }

  async remove(productId: string): Promise<IPositiveRequest> {
    const deletedProduct = await this.productEntity
      .createQueryBuilder('products')
      .delete()
      .from('products')
      .where({ id: productId })
      .execute();

    if (deletedProduct.affected === 0) {
      throw new HttpException(
        'Product is not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
    };
  }
}
