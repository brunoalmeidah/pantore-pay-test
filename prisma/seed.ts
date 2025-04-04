import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('123456', 10),
        role: Role.CUSTOMER,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
