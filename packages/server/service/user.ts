import { pbkdf2Sync } from "crypto";
import { APP_SECRET } from "$/src/envValues";
import { prisma } from "$/src/prismaClient";
import { User } from "$/prisma/client";
import { depend } from "velona";

export function makePasswordHash(password: string) {
  const digest = "sha256";
  const keylen = 64;
  const iterations = 100000;
  return `${digest}:${keylen}:${iterations}:${APP_SECRET}:${pbkdf2Sync(
    password,
    APP_SECRET,
    iterations,
    keylen,
    digest
  )}`;
}

export const validateUser = depend(
  { prisma },
  async ({ prisma }, name: User["name"], password: string) => {
    const user = await prisma.user.findUnique({ where: { name } });
    return user && (user.hashedPassword = makePasswordHash(password));
  }
);
