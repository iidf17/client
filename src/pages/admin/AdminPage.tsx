import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { UsersList } from '../../components/usersList'
import { User } from "../../types/models";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../constants/commonConstants";
import './adminPageStyles.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { getUsers, setUserRole } from "../../services";

export const AdminPage: FC = () => {
    const { users } = useAppSelector((state) => state.administration);
    const { accessToken, role } = useAppSelector((state) => state.user);
    const dipsatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || role === 'manager' || !role) {
                navigate(RoutePaths.NoPermission);
            } else {
                dipsatch(getUsers());
            }
        } else {
            navigate(RoutePaths.Login);
        }
    }, [accessToken, role, navigate, dipsatch]);

    const setAdminRoleHandler = (id:number) => {
        dipsatch(setUserRole({userId: id, roleName: 'admin'}));
    }

    const setManagerRoleHandler = (id: number) => {
        dipsatch(setUserRole({userId: id, roleName: 'manager'}));
    }

    const resetPermissionHandler = (id: number) => {
        dipsatch(setUserRole({userId: id, roleName: 'user'}));
    }

    return (
        <Layout title='Admin'>
            <UsersList onSetAdminRole={setAdminRoleHandler}
                    onSetManagerRole={setManagerRoleHandler}
                    onResetPermission={resetPermissionHandler}
                    usersList={users}
            />
            <Button text="На главную"
                onClick={() => navigate(RoutePaths.Departments)}
                className="navigate-btn"
                type="primary"
            />
        </Layout>
    )
}