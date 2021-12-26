/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser, UserPublicCreateArg } from "$/service/user";

const prismaMock = (databaseMock: any) => {
  return {
    user: {
      create: ({ data }: { data: UserPublicCreateArg }) => {
        // const now = new Date();
        const ret = {
          ...data,
          id: databaseMock.userCount,
          // createdAt: now,
          // updatedAt: now,
        };
        databaseMock.user.push(ret);
        databaseMock.userCount += 1;
        return ret;
      },
    },
  };
};

const passwordHashConfig = {
  digest: "sha256",
  keylen: 16,
  iterations: 1,
  salt: "secret",
};

test("service: user", async () => {
  const injectedCreateUser = createUser.inject({
    prisma: prismaMock({
      userCount: 0,
      user: [],
    }) as any,
    passwordHashConfig,
  });

  const newUser = await injectedCreateUser({
    name: "testUser00",
    email: "testUser00@example.com",
    password: "testUser00password",
  });
  expect(newUser).toStrictEqual({
    id: 0,
    name: "testUser00",
    email: "testUser00@example.com",
    icon: undefined,
    hashedPassword: "sha256:16:1:secret:BxGzXEkb3yWkl8Zd9+r7Ng==",
  });
});
