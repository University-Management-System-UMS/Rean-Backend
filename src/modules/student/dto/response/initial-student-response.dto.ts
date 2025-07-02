import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { IStudent } from '../../entities/student.entity';

export class BaseStudentResponseDto
  extends BaseResponseDto
  implements IStudent {}

export class InitialStudentResponseDto extends BaseStudentResponseDto {}
