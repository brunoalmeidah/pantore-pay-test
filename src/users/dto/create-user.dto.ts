import { Role } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O campo nome deve ser uma string' })
  name: string;
  @IsString({ message: 'O campo email deve ser uma string' })
  email: string;
  @IsString({ message: 'O campo senha deve ser uma string' })
  password: string;

  @IsEnum(Role, {
    message: 'O campo função deve ser um dos seguintes valores: USER, ADMIN',
  })
  role: Role;
}
