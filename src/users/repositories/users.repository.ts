import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindAllQuery } from '../types/find-all-query';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { name, email, password, role } = data;
    return this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });
  }

  async findAll(params: FindAllQuery): Promise<User[]> {
    const { page, take, email, name } = params;
    return this.prismaService.user.findMany({
      where: { email, name: { contains: name }, deletedAt: null },
      skip: (page - 1) * take,
      take: take,
    });
  }

  async count(params: FindAllQuery): Promise<number> {
    const { email, name } = params;
    return this.prismaService.user.count({
      where: { email, name: { contains: name }, deletedAt: null },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
