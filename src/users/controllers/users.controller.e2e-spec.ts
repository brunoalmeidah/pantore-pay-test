import { Role } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { createAgent } from 'src/helpers/createAgent';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let agent = null;
  let createdUser: User = {} as User;
  beforeAll(async () => {
    agent = createAgent();
  });

  it('Create /users (POST)', async () => {
    const userToCreate: CreateUserDto = {
      name: 'User created',
      email: 'email@email.com',
      password: '123456',
      role: Role.ADMIN,
    };
    const response = await agent.post('/users').send(userToCreate).expect(201);
    expect(response.body.name).toBe(userToCreate.name);
    expect(response.body.email).toBe(userToCreate.email);
    expect(response.body.role).toBe(userToCreate.role);
    expect(response.body.password).toBeUndefined();
    createdUser = response.body;
  });
  it('FindOne /users (GET)', async () => {
    const response = await agent.get(`/users/${createdUser.id}`).expect(200);
    expect(response.body.id).toBe(createdUser.id);
    expect(response.body.name).toBe(createdUser.name);
    expect(response.body.email).toBe(createdUser.email);
    expect(response.body.role).toBe(createdUser.role);
  });

  it('FindAll /users (GET)', async () => {
    const response = await agent.get(`/users`).expect(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('Delete /users (DELETE)', async () => {
    await agent.delete(`/users/${createdUser.id}`).expect(204);
  });
});
