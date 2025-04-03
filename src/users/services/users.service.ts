import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindAllQuery } from '../types/find-all-query';
import { FindAllResponse } from '../types/find-all-response';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const userExists = await this.repository.findOneByEmail(
      createUserDto.email,
    );

    if (userExists)
      throw new HttpException(
        'Já existe um usuário com este email',
        HttpStatus.BAD_REQUEST,
      );

    const passwordEncrypted = await bcrypt.hash(password, 10);
    const user = await this.repository.create({
      ...createUserDto,
      password: passwordEncrypted,
    });
    delete user.password;
    return user;
  }

  async findAll(query: FindAllQuery): Promise<FindAllResponse> {
    const { page, take, email, name } = query;
    const _page = page ?? 1;
    const _take = take ?? 10;
    const users = await this.repository.findAll({
      page: _page,
      take: _take,
      email,
      name,
    });
    const totalOfUsers = await this.repository.count({ email, name });
    return { data: users, total: totalOfUsers };
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.repository.findOne(id);
    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userExists = await this.repository.findOneByEmail(
      updateUserDto.email,
    );

    if (userExists && userExists.id !== id)
      throw new HttpException(
        'Já existe um usuário com este email',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.repository.findOne(id);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    delete updateUserDto.password;
    const userUpdated = await this.repository.update(id, updateUserDto);
    delete userUpdated.password;
    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.repository.findOne(id);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    await this.repository.remove(id);
  }
}
