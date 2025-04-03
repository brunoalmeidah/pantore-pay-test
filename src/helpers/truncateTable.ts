import { PrismaService } from 'src/prisma/prisma.service';

export async function truncateTable(name: string) {
  try {
    const prisma = global.testApp.get<PrismaService>(PrismaService);
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${name} RESTART IDENTITY CASCADE`,
    );
    console.log(`Table "${name}" truncated`);
  } catch (error) {
    console.error(`Error truncating table "${name}"`, error);
  }
}
