import { FC, useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { UsersList } from '../../components/usersList'
import { User } from "../../types/models";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../constants/commonConstants";
import './adminPageStyles.scss';

const fakeUsersList: Array<User> = [{
    id: 1,
    login: 'user1',
    password: '1234',
    role: 'user'
},{
    id: 2,
    login: 'user2',
    password: '12345',
    role: 'manager'
},{
    id: 3,
    login: 'user1',
    password: '123456',
    role: 'admin'
}]

export const AdminPage: FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(()=>{
            setUsers(fakeUsersList);
        }, 500);
    }, []);

    const setAdminRoleHandler = (id:number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u=>u.id===id);
            if(currentUser){
                currentUser.role = 'admin';
            }
            return cloneArray;
        });
    }

    const setManagerRoleHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u=>u.id===id);
            if(currentUser){
                currentUser.role = 'manager';
            }
            return cloneArray;
        });
    }

    const resetPermissionHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u=>u.id===id);
            if(currentUser){
                currentUser.role = 'user';
            }
            return cloneArray;
        });
    }

    return (
        <Layout title='Admin'>
            <Button text="На главную"
                onClick={() => navigate(RoutePaths.Departments)}
                className="navigate-btn"
                type="primary"
            />
            <UsersList onSetAdminRole={setAdminRoleHandler}
                    onSetManagerRole={setManagerRoleHandler}
                    onResetPermission={resetPermissionHandler}
                    usersList={users}
            />
        </Layout>
    )
}