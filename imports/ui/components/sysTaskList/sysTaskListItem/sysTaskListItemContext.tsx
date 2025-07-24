import React, { createContext } from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";

interface ISysTaskListItemContext {
    task: Partial<IToDos>;
    situacao: boolean;
    checkBoxClick: () => void;
    seeTaskInfo: (task: Partial<IToDos>) => void;
    anchorEl: null | Element;
    openMenu: (event: React.MouseEvent<Element>) => void;
    closeMenu: () => void;
}

export const SysTaskListItemContext = React.createContext<ISysTaskListItemContext>(
    {} as ISysTaskListItemContext
);

export default SysTaskListItemContext;
export type { ISysTaskListItemContext };