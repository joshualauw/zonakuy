import { User } from "@prisma/client";

type LoggedUser = Omit<User, "password"> & { token: string };

export default function () {
    return useState("loggedUser", () => null as LoggedUser | null);
}
