import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DataSource } from 'typeorm';
import { Auth, IAuth } from './entities/auth.entity';
import * as argon2 from 'argon2';
import { UserRoleEnum } from 'src/constants/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly dataSource: DataSource) {}
  async createStudentAuth(body: CreateAuthDto) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      const createBody: CreateAuthDto = {
        ...body,
        password: await argon2.hash(body.password),
      };

      const create = qr.manager.create(Auth, {
        ...createBody,
        tokenVersion: 0,
        roles: [UserRoleEnum.STUDENT],
      });
      const save = qr.manager.save(Auth, create);

      await qr.commitTransaction();
      await qr.release();

      return save;
    } catch (err) {
      await qr.rollbackTransaction();
      await qr.release();
      throw err;
    }
  }
}
