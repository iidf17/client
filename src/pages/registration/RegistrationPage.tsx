import { FC, useState } from 'react';
import { TextField } from '../../components';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import './registrationPageStyles.scss';
import { RoutesPaths } from '../../constants/commonConstants';
import { useNavigate } from 'react-router-dom';

type FormFieldsNames = 'login' | 'password' | 'repeatePassword' | 'lastName' | 'firstName' | 'midName';

interface RegistrationForm {
    login: string;
    password: string;
    repeatePassword: string;
    lastName: string;
    firstName: string;
    midName?: string;
}

export const RegistrationPage: FC = () => {
    const [formFields, setFormFields] = useState<RegistrationForm>();
    const navigate = useNavigate();

    const changeFieldValue = (value: string | undefined, fieldName: FormFieldsNames) => {
        setFormFields(prev => {
            return {
                ...prev,
                [fieldName]: value
            } as RegistrationForm;
        })
    };

    const registrationHandler = () => {
        navigate(RoutesPaths.Travels);
    }
    
    const goToLogin = () => {
        navigate(RoutesPaths.Login);
    }
    
    return (
        <WidgetLayout>
            <div className="reg-page__form">
                <h3 className="reg-page__title">Вход</h3>
                <div className="reg-page__fields">
                    <TextField labelText="Логин" value={formFields?.login} type="text" onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Пароль" value={formFields?.password} type="password" onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Повторите пароль" value={formFields?.repeatePassword} type="password" onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Фамилия" value={formFields?.lastName} type="text" onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Имя" value={formFields?.firstName} type="text" onChange={(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Отчество" value={formFields?.midName} type="text" onChange={(value) => changeFieldValue(value, 'login')} />
                </div>
                <div className="reg-page__action">    
                    <Button text="Зарегистрироваться" onClick={registrationHandler} type="primary"/>
                    <Button text="Войти" onClick={goToLogin} type="secondary" />
                </div>
            </div>
        </WidgetLayout>
    );
}