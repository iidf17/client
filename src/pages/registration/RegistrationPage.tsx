import { FC, useState } from 'react';
import { AuthApi } from '../../api';
import { TextField } from '../../components';
import { Button } from '../../components'
import { WidgetLayout } from '../../components/layouts/widgetLayout';
import './registrationPageStyles.scss'
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../constants/commonConstants';
import { Axios, AxiosError } from 'axios';
import { U } from 'react-router/dist/development/fog-of-war-Cm1iXIp7';

type FormFieldsNames = 'login' | 'password' | 'repeatPassword' | 'lastName' | 'firstName' | 'midName';

interface RegistrationForm {
    login: string;
    password: string;
    repeatPassword: string;
    // lastName: string;
    // firstName: string;
    // midName: string;
}

export const RegistrationPage: FC = () => {
    const [formFields, setFormFields] = useState<RegistrationForm>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();
    const data = {
        login: formFields?.login,
        password: formFields?.password
    }
    const { signUp, signIn } = AuthApi;

    const changeFieldValue = (value: string | undefined, fieldName: FormFieldsNames) => {
        setFormFields(prev => {
            return {
                ...prev,
                [fieldName]: value
            } as RegistrationForm;
        })
    };

    const registrationHandler = () => {
        //navigate(RoutePaths.Coaches);
        if(!formFields?.login || !formFields?.password) {
            setErrorMessage('Не задан логин или пароль.')
            return;
        }

        if(formFields?.password !== formFields?.repeatPassword) {
            setErrorMessage('Пароли не совпадают.')
            return;
        }

        signUp(data).then(() => {
            if(typeof data.login === 'string' && data.login.trim() !== '') {
                return
            };
            signIn(data).then(respData => {
                if(respData.role === 'user'){
                    navigate(RoutePaths.NoPermission);
                } else { 
                    navigate(RoutePaths.Departments);
                }
            }).catch(err => 
                setErrorMessage((err as AxiosError)?.message)
            );
            
        }).catch((err) => {
            setErrorMessage((err as AxiosError)?.message)
        });
    }
   

    const goToLogin = () => {
        navigate(RoutePaths.Login);
    }

    return (
        <WidgetLayout>
            <div className='reg-page__form'>
                <div className='reg-page__title'>Регистрация</div>
                <div className='reg-page__fields'>
                    <TextField labelText="Логин" value={formFields?.login} type='text' onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Пароль" value={formFields?.password} type='text' onChange={(value) => changeFieldValue(value, 'password')} />
                    <TextField labelText="Повторите пароль" value={formFields?.repeatPassword} type='text' onChange={(value) => changeFieldValue(value, 'repeatPassword')} />
                    {/* <TextField labelText="Фамилия" value={formFields?.lastName} type='text' onChange={(value) => changeFieldValue(value, 'lastName')} />
                    <TextField labelText="Имя" value={formFields?.firstName} type='text' onChange={(value) => changeFieldValue(value, 'firstName')} />
                    <TextField labelText="Отчество" value={formFields?.midName} type='text' onChange={(value) => changeFieldValue(value, 'midName')} /> */}
                    {errorMessage && (<span style={{color: 'red'}}>{errorMessage}</span>)}
                </div>
                <div className='reg-page__actions'>
                    <Button text='Зарегистрироваться' onClick={registrationHandler} type="primary" />
                    <Button text='Войти' onClick={goToLogin} type="secondary" />
                </div>
            </div>
        </WidgetLayout>
    )
}