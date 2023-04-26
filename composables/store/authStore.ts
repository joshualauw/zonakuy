import { User } from "@prisma/client";
interface LoggedUser {
    credentials: Omit<User, "password">;
    token: string;
}

export default function () {
    return useState("loggedUser", () => null as LoggedUser | null);
}
