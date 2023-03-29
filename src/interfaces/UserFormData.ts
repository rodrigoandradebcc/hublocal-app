import { UserCreateData } from "./UserCreateData";

export interface UserFormData extends UserCreateData {
    confirmationPassword: string;
}