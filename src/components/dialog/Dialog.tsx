import { FC } from "react";
import { DialogProps } from "./DialogProps";
import "./dialogStyles.scss";
import clsx from "classnames";
import { Button } from "../button";

export const Dialog: FC<DialogProps> = props => {
    const { 
        className, 
        title, 
        onCancel,
        onSave,
        open = false,
        children
    } = props;

    if (!open) return null;

    return (
        
        <div className="dialog" onClick={onCancel}>
            <div className={clsx('dialog__paper', className)} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <h4 className='dialog__header'>
                    {title}
                </h4>
                <div className="dialog__body">
                    {children}
                </div>
                <div className="dialog__footer">
                    <Button type="primary" text="Save" onClick={onSave}/>
                    <Button text="Cancel" onClick={onCancel}/>
                </div>
            </div>
        </div>
    );
}