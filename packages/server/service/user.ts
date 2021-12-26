import { pbkdf2Sync } from "crypto";
import { passwordHashConfig } from "$/configs/user";
import { prisma } from "$/src/prismaClient";
import { User } from "$prisma/client";
import { depend } from "velona";

export type UserPublic = Pick<
  User,
  "id" | "name" | "email" | "icon" | "createdAt" | "updatedAt"
>;

type UserArgBase = Omit<
  UserPublic,
  "id" | "icon" | "createdAt" | "updatedAt"
> & {
  icon?: UserPublic["icon"];
  password: string;
};

export type UserPublicCreateArg = UserArgBase;

export type UserPublicUpdateByIdArg = Pick<User, "name"> &
  Partial<Omit<UserArgBase, "name">>;

// Utils
export function makePasswordHash(
  password: string,
  config = passwordHashConfig
) {
  const { digest, keylen, iterations, salt } = config;
  return `${digest}:${keylen}:${iterations}:${salt}:${pbkdf2Sync(
    password,
    salt,
    iterations,
    keylen,
    digest
  ).toString("base64")}`;
}

export const validateUser = depend(
  { prisma, passwordHashConfig },
  async (
    { prisma, passwordHashConfig },
    name: User["name"],
    password: string
  ) => {
    const user = await prisma.user.findUnique({ where: { name } });
    return (
      user &&
      (user.hashedPassword = makePasswordHash(password, passwordHashConfig))
    );
  }
);

// Operations
//// Create
export const createUser = depend(
  { prisma, passwordHashConfig },
  async (
    { prisma, passwordHashConfig },
    { name, email, icon, password }: UserPublicCreateArg
  ) => {
    const hashedPassword = makePasswordHash(password, passwordHashConfig);
    const user = await prisma.user.create({
      data: { name, email, icon, hashedPassword },
    });
    return user;
  }
);

//// Read
export const getUserByName = depend(
  { prisma },
  async ({ prisma }, name: User["name"]) => {
    const user = await prisma.user.findUnique({ where: { name } });
    return user;
  }
);

//// Update
export const updateUserByName = depend(
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
    // !!TODO!! delete taskLists
    const ret = await prisma.user.delete({ where: { name } });
    return ret;
  }
);
