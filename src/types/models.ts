import { AriaAttributes } from "react";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    education?: Array<Education>;
    workExperience?: Array<WorkExperience>;
    files?: Array<UserFile>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    employees: Array<Employee>;
}

export interface Education {
    id: number;
    description?: string;
    title: string;
}

export interface WorkExperience {
    id: number;
    workedYears: number;
    description?: string;
}

export interface UserFile {
    id: number;
    systemName: string;
    displayName: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
}