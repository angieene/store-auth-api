import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { IPositiveRequest } from 'src/core/types/main';
export declare class ProductsService {
    private productEntity;
    constructor(productEntity: Repository<ProductEntity>);
    create(createProductDto: CreateProductDto): Promise<IPositiveRequest>;
    findAllPaginate(paginateProductsDto: PaginateProductsDto): Promise<Array<ProductEntity>>;
    findOne(productId: string): Promise<ProductEntity>;
    update(productId: string, updateProductDto: UpdateProductDto): Promise<IPositiveRequest>;
    updateStock(productId: string, newStock: number): Promise<IPositiveRequest>;
    remove(productId: string): Promise<IPositiveRequest>;
}
