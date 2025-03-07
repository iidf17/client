import { FC } from 'react';
import { LayoutProps } from './LayoutProps';
import './layoutStyles.scss'
import { LogoIcon } from '../../../assets/icons/LogoIcon';
import { UserMenu } from '../../userMenu';
import { useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/slices/userSlice";
import { MenuItem } from "../../userMenu/UserMenuProps";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../constants/commonConstants";


export const Layout: FC<LayoutProps> = props => {
    const {footer, headerChild, title, children} = props;
    const { role } = useAppSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        dispatch(logOut());
    }

    const goToAdministrationHandler = () => {
        navigate(RoutePaths.Admin);
    }

    const exitMenuItem: MenuItem = {
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    }

    const adminMenuItem: MenuItem = {
        id: 'go_to_admin',
        action: goToAdministrationHandler,
        label: 'Администрирование'
    }

    return (
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon/>
                </div>
                <div>
                    <div>{title ?? 'Департаменты'}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout__user-menu">
                    <UserMenu items={role === 'admin' ? [adminMenuItem, exitMenuItem] : [exitMenuItem] } />
                </div>
            </div>
            <div className="layout__body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}