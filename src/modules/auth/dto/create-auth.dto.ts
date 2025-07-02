import { ApiProperty } from '@nestjs/swagger';
import { IAuth } from '../entities/auth.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class CreateAuthDto
  implements Omit<IAuth, 'refreshToken' | 'tokenVersion' | 'roles'>
{
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @ValidateIf((o) => !o.isOAuth)
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  password: string;
}
