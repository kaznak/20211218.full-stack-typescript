import { Length, MaxLength, IsEmail } from "class-validator";
import { User } from "$/prisma/client";

export class AuthSignIn {
  @Length(8, 16)
  name!: User["name"];

  @Length(8, 64)
  password!: string;
}
