import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { Role } from 'src/core/enums/userRoles.enum';
import * as bcrypt from 'bcrypt';
import { OrderItemEntity } from 'src/orderItem/entities/orderItem.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '200', nullable: false })
  firstname: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '200', nullable: false })
  lastname: string;

  @ApiProperty({ type: String })
  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '2000', nullable: false, select: false })
  password: string;

  @ApiProperty({ enum: Role, isArray: false })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Guest,
  })
  role: Role[];

  @ApiProperty({ type: () => OrderItemEntity, required: false })
  @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.user)
  orderItems: OrderItemEntity[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
