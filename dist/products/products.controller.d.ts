import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { ProductEntity } from './entities/product.entity';
import { IPositiveRequest } from 'src/core/types/main';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<IPositiveRequest>;
    findAllPaginate(paginateProductDto: PaginateProductsDto): Promise<Array<ProductEntity>>;
    findOne(productId: string): Promise<ProductEntity>;
    update(productId: string, updateProductDto: UpdateProductDto): Promise<IPositiveRequest>;
    remove(productId: string): Promise<IPositiveRequest>;
}
