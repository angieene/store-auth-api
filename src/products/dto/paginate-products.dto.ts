import { PartialType } from '@nestjs/swagger';

import { PaginateDto } from 'src/core/dto/paginate.dto';

export class PaginateProductsDto extends PartialType(PaginateDto) {}
