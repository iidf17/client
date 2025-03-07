import { Education } from "../../types/models";

export interface EducationsListProps {
    educationsList: Array<Education>
    onDelete?: (id: number) => void;
}