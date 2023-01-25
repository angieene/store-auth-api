import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { OrderItemEntity } from 'src/orderItem/entities/orderItem.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: false })
  name: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false, default: 1 })
  stock: number;

  @ApiProperty({ type: Number })
  @Column({ type: 'float', nullable: false, default: 0.0 })
  price: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: true })
  description: string;

  @OneToOne(() => OrderItemEntity)
  order: OrderItemEntity;
}
