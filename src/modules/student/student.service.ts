import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Student } from './entities/student.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
  ) {}

  async registerStudent(body: RegisterStudentDto) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      const create = qr.manager.create(Student, {
        ...body,
      });

      const authRes = await this.authService.createStudentAuth(body.credential);

      const save = await qr.manager.save(Student, {
        ...create,
        auth: authRes,
      });

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
