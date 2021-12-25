import { User } from "$/prisma/client";

type Response = { ok: boolean; auth?: User };

export type Methods = {
  get: {
    resBody: Response;
  };
  post: {
    reqBody: User;
    resBody: Response;
  };
  delete: {
    resBody: Response;
  };
};
