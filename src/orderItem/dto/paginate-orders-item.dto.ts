import { PartialType } from '@nestjs/swagger';
import { PaginateDto } from 'src/core/dto/paginate.dto';

export class PaginateOrdersItemDto extends PartialType(PaginateDto) {}
