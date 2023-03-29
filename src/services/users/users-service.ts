import { UserCreateData } from "../../interfaces/UserCreateData";
import { UserResponseData } from "../../interfaces/UserResponseData";
import api from "../api";

async function postCreateUser(params: UserCreateData) {    
    const { data } = await api.post<UserResponseData>(`/users`, {
        name: params.name,
        email: params.email,
        password: params.password
    });
    return data;
}

export {
    postCreateUser,
};
