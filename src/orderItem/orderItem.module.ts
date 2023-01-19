import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { OrderItemEntity } from './entities/orderItem.entity';
import { OrderItemController } from './orderItem.controller';
import { OrderItemService } from './orderItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity]), ProductsModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
