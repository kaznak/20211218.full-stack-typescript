import { beforeEach, jest } from "@jest/globals";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import { PrismaClient } from "$prisma/client";
import prisma from "$/src/prismaClient";

jest.mock("$/src/prismaClient", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
