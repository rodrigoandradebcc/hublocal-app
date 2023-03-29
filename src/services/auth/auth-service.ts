import { AuthDataResponse } from "../../interfaces/AuthData";
import { LoginData } from "../../interfaces/LoginData";
import api from "../api";

async function postLogin(params: LoginData) {
    const { data } = await api.post<AuthDataResponse>(`/auth`, {
        email: params.email,
        password: params.password
    });
    return data;
}

export {
    postLogin
};