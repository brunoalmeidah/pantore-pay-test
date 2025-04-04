import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsString({ message: 'O campo senha deve ser uma string' })
  @ApiProperty({ default: '123456' })
  password: string;

  @IsString({ message: 'O campo de confirmação de senha deve ser uma string' })
  @ApiProperty({ default: '123456' })
  confirmPassword: string;
}
