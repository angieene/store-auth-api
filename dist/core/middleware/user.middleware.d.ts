import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class LoggerMiddleware implements NestMiddleware {
    private userEntity;
    constructor(userEntity: Repository<UserEntity>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
