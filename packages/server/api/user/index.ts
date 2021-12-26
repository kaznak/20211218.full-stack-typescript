import { UserPublic } from "$/service/user";

export type Methods = {
  put: {
    reqBody: Omit<UserPublic, "id" | "createdAt" | "updatedAt">;
    resBody: UserPublic;
  };
};
