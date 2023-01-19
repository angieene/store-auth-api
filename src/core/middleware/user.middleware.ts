import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}
  //private logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: NextFunction) {
    // const { ip, method, path: url } = req;
    // const userAgent = req.get('user-agent') || '';

    // res.on('close', () => {
    //   const { statusCode } = res;
    //   const contentLength = res.get('content-length');

    //   console.log(
    //     `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
    //   );
    // });

    const { userId } = req.params;

    await this.userEntity
      .createQueryBuilder()
      .update('users')
      .set({ firstname: 'middleware' })
      .where({ id: userId })
      .execute();

    next();
  }
}
