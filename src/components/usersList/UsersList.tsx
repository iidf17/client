import { FC } from "react";
import { Button } from "../button";
import { UsersListProps } from './UsersListProps';
import './usersListStyles.scss';


export const UsersList: FC<UsersListProps> = props => {
    const {
        usersList,
        onSetAdminRole,
        onSetManagerRole,
        onResetPermission,
    } = props;

    return(
        <div className="users-list">
            {usersList.map(user => {
                return (
                    <div key={user.id} className="users-list__item">
                        <div className="users-list__item-info">
                            <span>
                                <strong>Login: </strong>
                                <span>{user.login}</span>
                            </span>
                            <span>
                                <strong>Password: </strong>
                                <span>{user.password}</span>
                            </span>
                            <span>
                                <strong>Role: </strong>
                                <span>{user.role}</span>
                            </span>
                        </div>
                        <div className="users-list__item-actions">
                            <Button text="Make admin"
                                type="primary"
                                onClick={() => onSetAdminRole(user.id)}
                            />
                            <Button text="Make manager"
                                type="primary"
                                onClick={() => onSetManagerRole(user.id)}
                            />
                            <Button text="Reset roots"
                                type="primary"
                                onClick={() => onResetPermission(user.id)}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}