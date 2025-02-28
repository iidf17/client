import { FC, useState } from 'react';
import { Auth } from '../../api';
import { TextField } from '../../components';
import { Button } from '../../components'
import { WidgetLayout } from '../../components/layouts/widgetLayout';
import './loginPageStyles.scss'
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../constants/commonConstants';

export const LoginPage: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { signIn } = Auth;

    const loginChangeHandler = (value: string) => {
        setLogin(value);
    }

    const passwordChangeHandler = (value: string) => {
        setPassword(value);
    }

    const loginHandler = () => {
        // console.log({
        //     login,
        //     password
        // });
        navigate(RoutePaths.Departments);

        signIn({login, password})
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            })
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