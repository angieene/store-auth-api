import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/core/entities/base.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('order_item')
export class OrderItemEntity extends BaseEntity {
  constructor(partial: Partial<OrderItemEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false, default: 1 })
  amount: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: true })
  comments: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  productId: string;

  @ApiProperty({ type: () => ProductEntity, required: false })
  @OneToOne(() => ProductEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductEntity;

  @ApiProperty({ type: () => UserEntity, required: false })
  @ManyToOne(() => UserEntity, (user) => user.orderItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
