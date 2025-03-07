import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto } from "../types/apiTypes";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { AuthApi } from "../api";

const NAMESPACE = 'user';

export const signIn = createAsyncThunk<LoginResponseDto, LoginRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signIn`,
    async(loginData, { rejectWithValue }) => {
        try {
            return await AuthApi.signIn(loginData);
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
)

export const signUp = createAsyncThunk<LoginResponseDto, RegistrationRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signUp`,
    async(regData, { rejectWithValue }) => {
        try {
            await AuthApi.signUp(regData)
            return await AuthApi.signIn({
                login: regData.login,
                password: regData.password
            });
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
)