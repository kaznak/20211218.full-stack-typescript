import { pbkdf2Sync } from "crypto";
import { passwordHashConfig } from "$/configs/user";
import { prisma } from "$/src/prismaClient";
import { User } from "$/prisma/client";
import { depend } from "velona";

export type UserPublic = Pick<
  User,
  "id" | "name" | "email" | "icon" | "createdAt" | "updatedAt"
>;

type UserArgBase = Omit<UserPublic, "id" | "createdAt" | "updatedAt"> & {
  password: string;
};

export type UserPublicCreateArg = UserArgBase;

export type UserPublicUpdateByIdArg = Pick<User, "name"> &
  Partial<Omit<UserArgBase, "name">>;

// Utils
export function makePasswordHash(password: string) {
  const { digest, keylen, iterations, salt } = passwordHashConfig;
  return `${digest}:${keylen}:${iterations}:${salt}:${pbkdf2Sync(
    password,
    salt,
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

// Operations
//// Create
export const createUser = depend(
  { prisma },
  async ({ prisma }, { name, email, icon, password }: UserPublicCreateArg) => {
    const hashedPassword = makePasswordHash(password);
    const user = await prisma.user.create({
      data: { name, email, icon, hashedPassword },
    });
    return user;
  }
);

//// Read
export const getUserbyName = depend(
  { prisma },
  async ({ prisma }, name: User["name"]) => {
    const user = await prisma.user.findUnique({ where: { name } });
    return user;
  }
);

//// Update
export const updateUserbyName = depend(
  { prisma },
  async ({ prisma }, data: UserPublicUpdateByIdArg) => {
    const { name, password } = data;
    const hashedPassword = password ? makePasswordHash(password) : undefined;
    const ret = await prisma.user.update({
      where: {
        name,
      },
      data: { ...data, hashedPassword },
    });
    return ret;
  }
);

//// Delete
export const deleteUserByName = depend(
  { prisma },
  async ({ prisma }, name: User["name"]) => {
    const data = { isActive: false };
  }
);
