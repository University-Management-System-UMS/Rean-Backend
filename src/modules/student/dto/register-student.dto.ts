import { GenderEnum } from 'src/constants/enums/gender.enum';
import { StudentTitleEnum } from 'src/constants/enums/student-title.enum';
import { IStudent } from '../entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAuthDto } from 'src/modules/auth/dto/create-auth.dto';
import { Type } from 'class-transformer';

export class RegisterStudentDto implements IStudent {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsDateString({ strictSeparator: true, strict: true })
  @IsOptional()
  dob: Date;

  @ApiProperty({ type: String, enum: StudentTitleEnum, required: false })
  @IsEnum(StudentTitleEnum)
  @IsOptional()
  title: StudentTitleEnum;

  @ApiProperty({ type: String, enum: GenderEnum, required: false })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({ type: CreateAuthDto })
  @ValidateNested()
  @Type(() => CreateAuthDto)
  credential: CreateAuthDto;
}
