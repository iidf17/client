import { UserFile } from "../../types/models";

export interface FilesListProps {
    filesList: Array<UserFile>
    onFileDownload?: (id: number) => void;
    onFileDelete?: (id: number) => void;
}