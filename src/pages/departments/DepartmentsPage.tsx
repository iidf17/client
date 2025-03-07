import { EmbedHTMLAttributes, FC, useEffect, useState, useRef } from "react";
import { Layout } from '../../components/layouts'
import { TrashIcon, DownloadIcon, UploadIcon, AddIcon, PencilIcon } from "../../assets/icons";
import { Button, DropDown, TextField, FilesList, EmployeesList, EducationList, WorkExperienceList } from "../../components";
import { Dialog } from "../../components";
import { Education, WorkExperience, Employee, Department } from "../../types/models";
import './departmentsPageStyles.scss'
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { upload } from "@testing-library/user-event/dist/upload";
import { DepartmentsApi, FilesApi } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { Navigate, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../constants/commonConstants";
import { addDepartments, addEducation, addEmployee, addWorkExperience, deleteDepartments, deleteEducation, deleteEmployee, deleteFile, deleteWorkExperience, editEmployee, getDepartments, uploadFile } from "../../services";
import { walkUpBindingElementsAndPatterns } from "typescript";


export const DepartmentsPage: FC = () => {
    const { role, accessToken } = useAppSelector((state) => state.user);    
    const { departments } = useAppSelector((state) => state.departments);
    const dispatch = useAppDispatch();

    //const { getDepartments, deleteDepartment } = DepartmentsApi;

    //const [depsData, setDepsData] = useState<Array<Department>>([]);
    const [employeesData, setEmployeesData] = useState<Array<Employee>>([]);
    const [selectedDepartmentId, setSelectedDepatmentId] = useState<number>();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showDepDialog, setShowDepartmentDialog] = useState(false);
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [ShowEducationDialog, setShowEducationDialog] = useState(false);
    const [showWorkExperienceDialog, setShowWorkExpDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [departmentsActionMode, setDepartmentsActionMode] = useState<'create' | 'edit'>('create');
    
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMidName] = useState('');

    const [educationName, setEducationName] = useState('');
    const [workName, setWorkName] = useState('');
    const [workExp, setWorkExp] = useState('');
    const [educationDescription, setEducationDescription] = useState('');
    const [workDescription, setWorkDescription] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || !role) {
                navigate(RoutePaths.NoPermission);
            } else {
                dispatch(getDepartments());
            } 
        } else {
            navigate(RoutePaths.Login);
        }
    }, [accessToken, role, navigate, dispatch])
    
    // useEffect(() => {
    //     getDepartments()
    //     .then(respData => {
    //         setDepsData(respData)
    //         if(respData.length) {
    //             setSelectedDepatmentId(respData[0].id);
    //         }
    //     }).catch(err => {
    //         setDepsData([]);
    //         console.log(err);
    //     });
    // }, [getDepartments]);

    useEffect(() => {
        const selectedDep = selectedDepartmentId 
                        ? departments.find(d => d.id === selectedDepartmentId)
                        : departments[0];
        setSelectedDepatmentId(selectedDep?.id);
        setEmployeesData(selectedDep ? selectedDep.employees : []);
        setSelectedEmployee(undefined);
    }, [departments, selectedDepartmentId]);

    useEffect(() => {
        clearEmployeeDialogFields();
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined

            setLastName(employee?.lastName ?? '')
            setFirstName(employee?.firstName ?? '')
            setMidName(employee?.middleName ?? '')
        } 
    }, [employeesData, userActionMode, userToEdit])

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create');
        setUserToEdit(0);
        setLastName('');
        setFirstName('');
        setMidName('');
    }

    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    const editEmployeeHandler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowEmployeeDialog(true);
    }
   
    const deleteEmployeeHandler = (id: number) => {
        setUserToEdit(id);
        if(window.confirm('Вы действительно хотите удалить данного сотрудника?')){
            dispatch(deleteEmployee(id));
        }
    }

    const closeEmployeeDialogHandler = () => {
        setShowEmployeeDialog(false);
        clearEmployeeDialogFields();
    }

    const saveEmployeeDialogHandler = () => {
        if(!selectedDepartmentId) {
            return;
        }

        const savingEmployee = {
            departmentId: selectedDepartmentId,
            firstName,
            lastName,
            middleName
        };
        if(userActionMode === 'create') {
            dispatch(addEmployee(savingEmployee));
        }
        if(userActionMode === 'edit' && selectedEmployee) {
            dispatch(editEmployee({
                ...savingEmployee,
                id: selectedEmployee.id,
                educations: selectedEmployee.education ?? [],
                workExperience: selectedEmployee.workExperience ?? [],
                filesList: selectedEmployee.files ?? []
            }));
        }
    }

    const departmentChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedDepatmentId(_id)
    }

    const onEmployeeSelectedHandler = (id: number) => {
        const employee = employeesData.find(e => e.id === id);
        setSelectedEmployee(employee);
    }

    const getFullName = () => {
        if(!selectedEmployee) {
            return '';
        }
        return `${selectedEmployee.lastName} ${selectedEmployee.firstName} ${selectedEmployee.middleName ?? ''}`.trim();
    }

    const fileToBase64 = (file: any, callback: (base64string: string) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(reader?.result && typeof reader.result === 'string') {
                const base64string = reader.result.split(',')[1];
                callback(base64string);
            } else {
                callback('');
            }
        }
    }

    const uploadFileHandler = () => {
        fileInputRef.current?.click();
    }

    const fileSelectHandler = (e: any) => {
        const file = e.target.files[0];
        if(file) {
            fileToBase64(file, (base64Sting: string) => {
                dispatch(uploadFile({
                    employeeId: selectedEmployee!.id,
                    fileName: file.fileName,
                    fileString: base64Sting
                }))
            })
        }
    }

    const downloadFileHandler = (displayName: string, systemName: string) => {
        FilesApi().downloadFile({
            displayName,
            systemName
        }).then(data => {
            const blob = new Blob([data], {'type': 'application/octet-stream'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.click();
        })
    }

    // const closeDepartmentDialogHandler = () => {
    //     setShowDepartmentDialog(false);
    //     setDepartmentName('');
    //     setDepartmentActionMode('create');
    // }

    // const saveDepartmentHandler = () => {
    //     if(departmentsActionMode === 'create') {
    //         dispatch(addDepartments({name: departmentName}))
    //         closeDepartmentDialogHandler();
    //         return;
    //     }
    //     if(!selectedDepartmentId) {
    //         closeDepartmentDialogHandler();
    //         return;
    //     }
    //     if(departmentsActionMode === 'edit') {
    //         dispatch(deleteDepartments)
    //     }
    // }

    const deleteDepartmentHandler = () => {
        if(selectedDepartmentId && window.confirm('Вы действительно хотите удалить данный отдел?')){
            dispatch(deleteDepartments(selectedDepartmentId));
            setSelectedDepatmentId(undefined);
        }
    }

    return(
        <Layout>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <DropDown items={departments?.map(dd => {
                        return {
                            txt: dd.name,
                            value: dd.id.toString()
                        } as DropDownItem;
                    })}
                        label="Отделы:"
                        selectedChanged={(val) => departmentChangedHandler(val)}
                    />
                    {role === 'admin' && (<>
                        {/* <AddIcon width={16} height={16} className="dep-page__add-btn" />
                        <PencilIcon/> */}
                        <TrashIcon onClick={deleteDepartmentHandler} width={24} height={24} />
                    </>)}
                    <div>Список сотрудников:</div>
                    <EmployeesList 
                        employeesList={employeesData}
                        onItemClick={(id) => onEmployeeSelectedHandler(id)}
                        onItemDelete={deleteEmployeeHandler} 
                        onItemEdit={editEmployeeHandler}
                    />
                    { <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick={createEmployeeHandler}/> }
                </div>
                
                <div className="dep-page__user-info-container">
                    <div className="dep-page__user-info-header">
                        <div className="dep-page__user-info-user">
                            <div className="dep-page__user-info-fullname">
                                {getFullName()}
                            </div>
                            <span>{selectedEmployee?.id ?? "-"}</span>
                        </div>
                        <div className="dep-page__user-info-actions">
                            {selectedEmployee && (<UploadIcon onClick={uploadFileHandler} color='#7a7a7a'/>)}
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files">
                            <span>Прикрепленные файлы:</span>
                            <FilesList filesList={selectedEmployee?.files ?? []} />  
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <span>Данные об обучении:</span>
                                <EducationList educationsList={selectedEmployee?.education ?? []} onDelete={(id) => {
                                    if(window.confirm('?')){
                                        dispatch(deleteEducation(id));
                                    }
                                }} />
                            </div>
                            <div className="dep-page__user-add-info-data__cell">
                                <span>Данные о работе:</span>
                                <WorkExperienceList workExperienceList={selectedEmployee?.workExperience ?? []} onDelete={(id) => {
                                    if(window.confirm('?')){
                                        dispatch(deleteWorkExperience(id));
                                    }
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>

                <input type='file' onChange={fileSelectHandler} style={{display: 'none'}} ref={fileInputRef} />
                <Dialog title={userActionMode !== 'edit' ? 'Add employee' : 'Edit employee'}
                        open={showEmployeeDialog}
                        onSave={saveEmployeeDialogHandler}
                        onCancel={closeEmployeeDialogHandler}
                    >
                    <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)}/>
                    <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)}/>
                    <TextField labelText="Отчество" value={middleName} onChange={(val) => setMidName(val)}/>
                </Dialog>
                <Dialog title='Данные об образовании'
                        open={ShowEducationDialog}
                        onSave={() => {
                            dispatch(addEducation({
                                employeeId: selectedEmployee!.id,
                                title: educationName,
                                description: educationDescription
                            }));
                            setShowEducationDialog(false);
                            setEducationName('');
                            setEducationDescription('');
                        }}
                        onCancel={() => {
                            setShowEducationDialog(false);
                            setEducationName('');
                            setEducationDescription('');
                        }}
                    >
                    <TextField labelText="Наименование" value={educationName} onChange={(val) => setEducationName(val)}/>
                    <TextField labelText="Описание" value={educationDescription} onChange={(val) => setEducationDescription(val)}/>
                </Dialog>
                <Dialog title='Данные об опыте работы'
                        open={showWorkExperienceDialog}
                        onSave={() => {
                            dispatch(addWorkExperience({
                                employeeId: selectedEmployee!.id,
                                workedYears: +workExp,
                                description: workName
                            }));
                            setShowWorkExpDialog(false);
                            setWorkName('');
                            setWorkDescription('');
                        }}
                        onCancel={() => {
                            setShowWorkExpDialog(false);
                            setWorkName('');
                            setWorkDescription('');
                        }}
                    >
                    <TextField labelText="Место" value={workDescription} onChange={(val) => setWorkName(val)}/>
                    <TextField labelText="Стаж" value={workExp} onChange={(val) => setWorkExp(val)}/>
                </Dialog>
                    
            </div>
        </Layout>
    )
}