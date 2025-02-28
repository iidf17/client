import { User } from "../../types/models";

export interface UsersListProps{
    usersList: Array<User>;
    onSetAdminRole: (id:number) => void;
    onSetManagerRole: (id: number) => void;
    onResetPermission: (id: number) => void;
}