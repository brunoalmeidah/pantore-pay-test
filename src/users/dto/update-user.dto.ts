import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsString({ message: 'O campo nome deve ser uma string' })
  @ApiProperty({ default: 'João Oliveira' })
  name: string;
  @IsString({ message: 'O campo email deve ser uma string' })
  @ApiProperty({ default: 'joao@gmail.com' })
  email: string;
  @IsEnum(Role, {
    message: 'O campo função deve ser um dos seguintes valores: USER, ADMIN',
  })
  @ApiProperty({ enum: Role, default: 'CUSTOMER', isArray: false })
  role: Role;
}
