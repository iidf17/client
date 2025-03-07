import { FC } from "react";
import { WorkExperienceListProps } from "./WorkExperienceListProps";
import './workExperienceListStyles.scss'
import { TrashIcon } from "../../assets/icons";

export const WorkExperienceList: FC<WorkExperienceListProps> = props => {
    const { 
        workExperienceList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete?.(id);
    }

    return (
        <div className="workExp-list">
            {workExperienceList.map(we => {
                return (
                    <div key={we.id} className="workExp-list__item">
                        <div>
                            <span>Отмотал {we.workedYears} лет в {we.description ?? 'неизвестно'}</span>
                        </div>
                        <div className="workExp-list__item-actions">
                            <TrashIcon width={16} height={16} onClick={() => {deleteHandler(we.id)}} />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}