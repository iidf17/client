import { ChangeEvent, FC } from "react";
import { DropDownProps } from "./DropDownProps";
import './dropDownStyles.scss';
import clsx from 'classnames';

export const DropDown: FC<DropDownProps> = props => {
    const { items, label, lblWeight, selectedChanged } = props;

    const selectChangedHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const selValue = event.target.value;
        console.log(selValue);
        selectedChanged && selectedChanged(event.target.value);
    }

    return (
        <div className="drop-down">
            {!!label && (
                <label className={clsx("drop-down__lbl", {
                    'drop-down__lbl_strong': lblWeight ==='strong'
                })}>
                    {label}
                </label>)}
            <select className="drop-down__select" onChange={selectChangedHandler}>
                {items.map((item, index)=>{
                    return(
                        <option key={index} value={item.value}>{item.txt}</option>
                    );
                })}
            </select>
        </div>
    )
}