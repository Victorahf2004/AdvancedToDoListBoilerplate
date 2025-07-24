import React, { createContext } from "react";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";

interface ISysTaskListContext {
    tasksCompleto: IToDos[];
    tasksConcluidas: (string | undefined)[];
    tasksPendentes: (string | undefined)[];
}

export const SysTaskListContext = React.createContext<ISysTaskListContext>(
    {} as ISysTaskListContext
);

export default SysTaskListContext;
export type { ISysTaskListContext };