import { ChangeEvent, FC } from 'react';
import { TextFieldProps } from './TextFieldProps';
import './textFieldStyles.scss';
import clsx from 'classnames';
import { error } from 'console';

export const TextField: FC<TextFieldProps> = props => {
    const {
        info,
        infoType = 'error',
        labelText,
        lblWeight,
        onChange,
        type = 'text',
        value
    } = props;

    const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <div className="container">
            <label className={clsx('container_lbl', {
                'container_lbl_strong': lblWeight==='strong'
            })}>{labelText}</label>
            <input className="container_input" type={type} value={value} onChange={changeValueHandler}/>
            <span className={clsx('container_info', {
                'container_info_info': infoType === 'info',
                'container_info_error': infoType === 'error',
                'container_info_succes': infoType === 'success'
            })}>{info}</span>
        </div>
    )
}