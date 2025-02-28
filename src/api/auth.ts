import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from './axiosInstance';
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto } from "../types/apiTypes";

const {axiosPost} = AxiosInstance();

const signIn = async(loginData: LoginRequestDto) => {
    const data = await axiosPost('/login', loginData) as LoginResponseDto;
    sessionStorage.setItem(AccessTokenKey, data.access_token);
    return data;
}

const signUp = async(regData: RegistrationRequestDto) =>
    await axiosPost('/register', regData) as void;

export const Auth = {
    signIn,
    signUp
}