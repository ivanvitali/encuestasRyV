import { Roles } from "../shared/roles.model";

export interface User {
    name: string;
    email: string;
    userId: string;
    registrationDate?: Date;
    roles: Roles
}