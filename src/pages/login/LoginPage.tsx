import { FC, useDebugValue, useEffect, useState } from 'react';
import { AuthApi } from '../../api';
import { TextField } from '../../components';
import { Button } from '../../components'
import { WidgetLayout } from '../../components/layouts/widgetLayout';
import './loginPageStyles.scss'
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../constants/commonConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import { displayPartsToString } from 'typescript';
import { signIn } from '../../services';

export const LoginPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || !role) {
                navigate(RoutePaths.NoPermission);
            } else {
                navigate(RoutePaths.Departments);
            }
        }
    }, [accessToken, role, navigate]);

    const loginChangeHandler = (value: string) => {
        setLogin(value);
    }

    const passwordChangeHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        dispatch(signIn({login, password}));
    }

    const toRegistrationHandler = () => {
        navigate(RoutePaths.Registration);
    }

    return (
        <WidgetLayout>
            <div className='login-page__form'>
                <div className='login-page__title'>Вход</div>
                <div className='login-page__fields'>
                    <TextField labelText="Логин" value={login} type='text' onChange={loginChangeHandler}/>
                    <TextField labelText="Пароль" value={password} type='text' onChange={passwordChangeHandler}/>
                </div>
                <div className='login-page__actions'>
                    <Button text='Войти' onClick={loginHandler} type="primary"/>
                    <Button text='Зарегистрироваться' onClick={toRegistrationHandler} type="secondary"/>
                </div>
            </div>
        </WidgetLayout>
    )
}