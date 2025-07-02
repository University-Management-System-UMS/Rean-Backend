import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { IAuth } from '../../entities/auth.entity';

export class BaseAuthResponseDto extends BaseResponseDto implements IAuth {}

export class InitialAuthResponseDto extends BaseAuthResponseDto {}
