import React, { createContext } from "react";
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from "../../api/toDosSch";

interface IToDosDetailContext {
    closePage: () => void;
    document: IToDos;
    loading: boolean;
    schema: ISchema<IToDos>;
    onSubmit: (doc: IToDos) => void;
    changeToEdit: (id: string) => void;
    anchorEl: null | Element;
    openMenu: (event: React.MouseEvent<Element>) => void;
    closeMenu: () => void;
    onDeleteButtonClick: (task: any) => void;
    task: Partial<IToDos>;
}

export const ToDosDetailContext = createContext<IToDosDetailContext>(
    {} as IToDosDetailContext
);

export default ToDosDetailContext;
export type { IToDosDetailContext };