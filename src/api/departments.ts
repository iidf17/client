import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";
import { AddDepartmentRequestDto, EditDepartmentResponceDto } from "../types/apiTypes";

const { axiosDelete, axiosGet, axiosPut, axiosPost } = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? ''); 

const getDepartments = async() =>
    await axiosGet('/Departments');

const addDepartment = async(addDepsData: AddDepartmentRequestDto) =>
    await axiosPost('/Departments/department', addDepsData) as void;

const editDepartment = async(editDepsData: EditDepartmentResponceDto) =>
    await axiosPut('/Departments/department', editDepsData) as void;

const deleteDepartment = async(id: string | number) =>
    await axiosDelete(`/Departments/department?id=${id}`) as void;

export const Departments = {
    getDepartments,
    addDepartment,
    editDepartment,
    deleteDepartment
}