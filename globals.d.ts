import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface global {}
declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient;
  }
}
