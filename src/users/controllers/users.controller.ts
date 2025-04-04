import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindAllQuery } from '../types/find-all-query';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    example: {
      id: '1',
      name: 'João Oliveira',
      email: 'joao@gmail.com',
      role: 'CUSTOMER',
      createdAt: '2023-10-01T00:00:00.000Z',
      updatedAt: '2023-10-01T00:00:00.000Z',
      deletedAt: null,
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Já existe um usuário com este email',
    example: {
      statusCode: 400,
      message: 'Já existe um usuário com este email',
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Página atual',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Número de usuários por página',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Email do usuário',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Nome do usuário',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      data: [
        {
          id: '1',
          name: 'João Oliveira',
          email: 'joao@gmail.com',
          role: 'CUSTOMER',
          createdAt: '2023-10-01T00:00:00.000Z',
          updatedAt: '2023-10-01T00:00:00.000Z',
          deletedAt: null,
        },
      ],
      total: 1,
    },
  })
  findAll(@Query() query: FindAllQuery) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: '1',
      name: 'João Oliveira',
      email: 'joao@gmail.com',
      role: 'CUSTOMER',
      createdAt: '2023-10-01T00:00:00.000Z',
      updatedAt: '2023-10-01T00:00:00.000Z',
      deletedAt: null,
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: '1',
      name: 'João Oliveira',
      email: 'joao@gmail.com',
      role: 'CUSTOMER',
      createdAt: '2023-10-01T00:00:00.000Z',
      updatedAt: '2023-10-01T00:00:00.000Z',
      deletedAt: null,
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Já existe um usuário com este email',
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Já existe um usuário com este email',
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Usuário não encontrado',
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/change-password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Senha Alterada com sucesso',
    example: {
      message: 'Senha alterada com sucesso',
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Usuário não encontrado',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'As senhas não coincidem',
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'As senhas não coincidem',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'A nova senha não pode ser igual a senha atual',
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'A nova senha não pode ser igual a senha atual',
    },
  })
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(id, changePasswordDto);
    return { message: 'Senha alterada com sucesso' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Usuário não encontrado',
    },
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
