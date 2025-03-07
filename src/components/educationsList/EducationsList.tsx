import { FC } from "react";
import { EducationsListProps } from "./EducationsListProps";
import './educationsListStyles.scss'
import { TrashIcon } from "../../assets/icons";

export const EducationList: FC<EducationsListProps> = props => {
    const { 
        educationsList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete?.(id);
    }

    return (
        <div className="education-list">
            {educationsList.map(ed => {
                return (
                    <div key={ed.id} className="education-list__item">
                        <div>
                            <span>{ed.title}</span>
                            <span>{": " + ed.description}</span>
                        </div>
                        <div className="education-list__item-actions">
                            <TrashIcon width={16} height={16} onClick={() => {deleteHandler(ed.id)}} />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}