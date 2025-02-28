export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    access_token: string;
    usename: string;
    role: string;
}

export interface RegistrationRequestDto {
    login: string;
    password: string;
}

//TODO: дополнить
export interface AddDepartmentRequestDto {
    coachId?: number;
    athleteId?: number;
    name: string;
    date?: Date;
    description?: string;
    trainingType?: number;
}

export interface EditDepartmentResponceDto {
    id: number;
    coachId?: number;
    athleteId?: number;
    name: string;
    date?: Date;
    description?: string;
    trainingType?: number;
}



export interface EditCoachResponceDto {
    id: number;
    coachId?: number;
    athleteId?: number;
    name: string;
    date?: Date;
    description?: string;
    trainingType?: number;
}