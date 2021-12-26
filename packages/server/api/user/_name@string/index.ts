import { AuthHeader } from "$/types/api";
import { UserPublic } from "$/service/user";

export type Methods = {
  get: {
    reqHeaders: AuthHeader;
    resBody: UserPublic;
  };
  post: {
    reqHeaders: AuthHeader;
    reqBody: Partial<Omit<UserPublic, "createdAt" | "updatedAt">>;
    resBody: UserPublic;
  };
  delete: {
    reqHeaders: AuthHeader;
  };
};
