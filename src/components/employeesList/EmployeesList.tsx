import { FC, useState } from "react";
import { EmployeesListProps } from "./EmployeesListProps";
import './employeesListStyles.scss'
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from "../../assets/icons";

export const EmployeesList: FC<EmployeesListProps> = props => {
    const { 
        employeesList, 
        onItemClick,
        onItemEdit,
        onItemDelete 
    } = props;

    const [selectedUser, setSelectedUser] = useState(0)
    
    const employeesClickHandler = (id: number) => {
        setSelectedUser(id);
        onItemClick && onItemClick(id);
    }

    const employeesEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id);
    }

    const employeesDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
    }

    const isSelected = (id: number) => selectedUser === id;

    return (
        <div className="employees-list">
            {employeesList.map(user => {
                return (
                <div key={user.id}
                className={clsx("employees-list__item", {'employees-list__item_selected': isSelected(user.id)})}
                onClick={() => employeesClickHandler(user.id)}
                >
                    <div>
                        {`${user.lastName} ${user.firstName} ${user.middleName ?? ''}`.trim()}
                    </div>
                    <div>
                        <PencilIcon width={18} height={18} onClick={() => {employeesEditHandler(user.id)}}/>
                        <TrashIcon width={18} height={18} onClick={() => {employeesDeleteHandler(user.id)}}/>
                    </div>
                </div>)
            })}
        </div>
    )
}