import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
const repositoryMock = {
  create: jest.fn(() => {
    return {};
  }),
  update: jest.fn(() => {
    return {};
  }),
  findOne: jest.fn(async (id) => {
    const password = await bcrypt.hash('123456', 10);
    if (id === 'user-exist') return { id: 'user-exist', password };
    return null;
  }),
  findOneByEmail: jest.fn((email) => {
    if (email === 'teste-exist@email.com') return { id: 'user-exist' };

    return null;
  }),
  remove: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    await service.create({
      name: 'Teste user',
      email: 'teste-not-exist@email.com',
      password: '123456',
      role: Role.CUSTOMER,
    });
    expect(repositoryMock.create).toHaveBeenCalled();
  });

  it('should not create a user with email that already exist', () => {
    expect(
      service.create({
        name: 'Teste user',
        email: 'teste-exist@email.com',
        password: '123456',
        role: Role.CUSTOMER,
      }),
    ).rejects.toThrow('Já existe um usuário com este email');
  });

  it('should not find a user that not exist', () => {
    expect(service.findOne('not-exist-id')).rejects.toThrow(
      'Usuário não encontrado',
    );
  });

  it('should update a user', async () => {
    await service.update('user-exist', {
      name: 'Teste user',
      email: 'teste-not-exist@email.com',
      role: Role.CUSTOMER,
    });
    expect(repositoryMock.update).toHaveBeenCalled();
  });

  it('should not update a user  with email that already exist', () => {
    expect(
      service.update('id', {
        name: 'Bruno',
        email: 'teste-exist@email.com',
        role: Role.CUSTOMER,
      }),
    ).rejects.toThrow('Já existe um usuário com este email');
  });

  it('should not update a user that not exist', () => {
    expect(
      service.update('not-exist-id', {
        name: 'Bruno',
        email: 'teste-not-exist@email.com',
        role: Role.CUSTOMER,
      }),
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('should remove a user', async () => {
    await service.remove('user-exist');
    expect(repositoryMock.remove).toHaveBeenCalled();
  });

  it('should not remove a user that not exist', async () => {
    expect(service.remove('not-exist-id')).rejects.toThrow(
      'Usuário não encontrado',
    );
  });

  it('should not change password of user that not exist', async () => {
    expect(
      service.changePassword('not-exist-id', {
        password: '123456',
        confirmPassword: '123456',
      }),
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('should not change password if the password and confirmPassword is diferent', async () => {
    expect(
      service.changePassword('user-exist', {
        password: '1234567',
        confirmPassword: '123456',
      }),
    ).rejects.toThrow('As senhas não coincidem');
  });

  it('should not change password if new password is same as old password', async () => {
    expect(
      service.changePassword('user-exist', {
        password: '123456',
        confirmPassword: '123456',
      }),
    ).rejects.toThrow('A nova senha não pode ser igual a senha atual');
  });

  it('should changePassword a user', async () => {
    await service.changePassword('user-exist', {
      password: '1234567',
      confirmPassword: '1234567',
    });
    expect(repositoryMock.update).toHaveBeenCalled();
  });
});
