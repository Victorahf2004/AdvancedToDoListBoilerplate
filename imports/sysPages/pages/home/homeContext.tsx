import React, { createContext } from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";

interface IHomeContext {
    onAddButtonClick: () => void;
    onDeleteButtonClick: (row: any) => void;
    onEditButtonClick: (task: any) => void;
    onTaskButtonClick: () => void;
    todoList: IToDos[];
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HomeContext = React.createContext<IHomeContext>(
    {} as IHomeContext
);

export default HomeContext;
export type { IHomeContext };