import { APP_SECRET } from "./envValues";

export const passwordHashConfig = {
  digest: "sha256",
  keylen: 64,
  iterations: 100000,
  salt: APP_SECRET,
};
