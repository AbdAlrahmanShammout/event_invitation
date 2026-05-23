import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();
const passwordSaltRounds = 10;
const defaultPassword = 'password123';
const superAdminEmail = 'admin@example.com';
const hallAdminEmail = 'hall.admin@example.com';

async function createPasswordHash(password: string): Promise<string> {
  return bcrypt.hash(password, passwordSaltRounds);
}

async function seedSuperAdmin(passwordHash: string): Promise<void> {
  await prismaClient.user.upsert({
    where: {
      email: superAdminEmail,
    },
    update: {
      name: 'System Admin',
      passwordHash,
      role: Role.super_admin,
      hallId: null,
    },
    create: {
      name: 'System Admin',
      email: superAdminEmail,
      passwordHash,
      role: Role.super_admin,
    },
  });
}

async function seedHallAdmin(passwordHash: string): Promise<void> {
  const hallAdmin = await prismaClient.user.upsert({
    where: {
      email: hallAdminEmail,
    },
    update: {
      name: 'Sample Hall Admin',
      passwordHash,
      role: Role.hall_admin,
    },
    create: {
      name: 'Sample Hall Admin',
      email: hallAdminEmail,
      passwordHash,
      role: Role.hall_admin,
    },
  });
  const existingHall = await prismaClient.hall.findFirst({
    where: {
      email: 'hall@example.com',
    },
  });
  const hall = existingHall
    ? await prismaClient.hall.update({
        where: {
          id: existingHall.id,
        },
        data: {
          name: 'Sample Event Hall',
          description: 'A sample event hall for local testing',
          address: 'Sample Address',
          email: 'hall@example.com',
          phone: '+1234567890',
          ownerId: hallAdmin.id,
        },
      })
    : await prismaClient.hall.create({
        data: {
          name: 'Sample Event Hall',
          description: 'A sample event hall for local testing',
          address: 'Sample Address',
          email: 'hall@example.com',
          phone: '+1234567890',
          ownerId: hallAdmin.id,
        },
      });
  await prismaClient.user.update({
    where: {
      id: hallAdmin.id,
    },
    data: {
      hallId: hall.id,
    },
  });
}

async function seedDatabase(): Promise<void> {
  const passwordHash = await createPasswordHash(defaultPassword);
  await seedSuperAdmin(passwordHash);
  await seedHallAdmin(passwordHash);
}

seedDatabase()
  .then(async () => {
    console.log(`Seeded super admin: ${superAdminEmail} / ${defaultPassword}`);
    console.log(`Seeded hall admin: ${hallAdminEmail} / ${defaultPassword}`);
    await prismaClient.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prismaClient.$disconnect();
    process.exit(1);
  });
