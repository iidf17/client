import { EmbedHTMLAttributes, FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { Layout } from '../../components/layouts'
import { TrashIcon, DownloadIcon, UploadIcon, AddIcon } from "../../assets/icons";
import { Button, DropDown, TextField, FilesList, EmployeesList } from "../../components";
import { Dialog } from "../../components";
import { Education, WorkExperience, Employee, Department } from "../../types/models";
import './departmentsPageStyles.scss'
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { upload } from "@testing-library/user-event/dist/upload";

const fakeEmpsData = [
    { id: 1, firstName: 'Dan', lastName: 'Radcliff'},
    { id: 2, firstName: 'Rupert', lastName: 'Green'},
    { id: 3 , firstName: 'Albus', lastName:'Potter', middleName: 'Severus', 
        education: [{
            id:1,
            description:'VSTU',
            title: 'VSTU'
        }, {
            id:2,
            description:'Griffindor faculty',
            title: 'Hogwarts witchcraft and wizardry school'
        }],
        workExperience: [{
            id:1,
            description:'Ministry of magic',
            workedYears: 3
        }]
    }
]

const fakeDepsData = [
    { id: 1, name: 'otdel 1', employees: []}, 
    { id: 2, name: 'otdel 2', employees: fakeEmpsData},
    { id: 3, name: 'otdel 3',  employees: []}
]

export const DepartmentsPage: FC = () => {
    const [depsData, setDepsData] = useState<Array<Department>>([]);
    const [employeesData, setEmployeesData] = useState<Array<Employee>>([]);
    const [selectedDepartmentId, setSelectedDepatmentId] = useState<number>();
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMidName] = useState('');
    
    useEffect(() => {
        setTimeout(() => {
            setDepsData(fakeDepsData);
            if(Array.isArray(fakeDepsData) && fakeDepsData.length) {
                setSelectedDepatmentId(fakeDepsData[0].id);
            }
        }, 500)
    }, []);

    useEffect(() => {
        const selectedDep = depsData.find(d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDep ? selectedDep.employees : []);
        setSelectedEmployee(undefined);
    }, [depsData, selectedDepartmentId]);

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
   
    const userDialogContentRenderer = () => {
        const employee = userActionMode === 'edit'
            ? employeesData.find(e => e.id === userToEdit)
            : undefined;
        return (
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)}/>
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)}/>
                <TextField labelText="Отчество" value={middleName} onChange={(val) => setMidName(val)}/>
            </>
        )
    }

    const closeEmployeeDialogHandler = () => {
        setShowEmployeeDialog(false);
        clearEmployeeDialogFields();
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

    const uploadFileHandler = () => {
        
    }

    return(
        <Layout>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <DropDown items={depsData.map(dd => {
                        return {
                            txt: dd.name,
                            value: dd.id.toString()
                        } as DropDownItem;
                    })}
                        label="Отделы:"
                        selectedChanged={(val) => departmentChangedHandler(val)}
                    />
                    <div>Список сотрудников:</div>
                    <EmployeesList 
                        employeesList={fakeEmpsData}
                        onItemClick={(id) => onEmployeeSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete', id)} 
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
                        </div>
                        <div className="dep-page__user-info-actions">
                            <UploadIcon onClick={uploadFileHandler}/>
                        </div>
                    </div>
                </div>
                <Dialog title={userActionMode !== 'edit' ? 'Add employee' : 'Edit employee'}
                        open={showEmployeeDialog}
                        onSave={() => {}}
                        onCancel={closeEmployeeDialogHandler}
                    >
                        {userDialogContentRenderer()}
                    </Dialog>
            </div>
        </Layout>
    )
}