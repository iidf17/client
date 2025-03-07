import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddDepartmentRequestDto, EditDepartmentResponseDto } from "../types/apiTypes";

export const DepartmentsApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? '';

    const { axiosDelete, axiosGet, axiosPut, axiosPost } = AxiosInstance(token); 

    const getDepartments = async() =>
        await axiosGet('/Departments');
    
    const addDepartment = async(addDepsData: AddDepartmentRequestDto) =>
        await axiosPost('/Departments/department', addDepsData) as number;
    
    const editDepartment = async(editDepsData: EditDepartmentResponseDto) =>
        await axiosPut('/Departments/department', editDepsData) as void;
    
    const deleteDepartment = async(id: string | number) =>
        await axiosDelete(`/Departments/department?id=${id}`) as void;

    return {
        getDepartments,
        addDepartment,
        editDepartment,
        deleteDepartment
    }
}