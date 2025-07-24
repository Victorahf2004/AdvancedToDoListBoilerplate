import React, { createContext } from "react";
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from "../../api/toDosSch";
import { IAba } from '/imports/ui/components/sysTabs/sysTabs';

interface IToDosListContext {
    onAddButtonClick: () => void;
    onDeleteButtonClick: (task: any) => void;
    onEditButtonClick: (task: any) => void;
    todoList: IToDos[];
    schema: ISchema<any>;
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
    valueTab: string;
    handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
    abas: IAba[];
    pageAtual: number;
    totalPaginas: number;
    alterarPagina: (event: any, value: number) => void;
}

export const ToDosListContext = React.createContext<IToDosListContext>(
    {} as IToDosListContext
);

export default ToDosListContext;
export type { IToDosListContext };
