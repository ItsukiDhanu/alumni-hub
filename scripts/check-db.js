async function main() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    const result = await prisma.$runCommandRaw({ ping: 1 });
    if (result?.ok === 1) {
      console.log('✅ Successfully connected to MongoDB.');
    } else {
      console.error('⚠️ Prisma ping returned unexpected result:', result);
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB via Prisma.');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
