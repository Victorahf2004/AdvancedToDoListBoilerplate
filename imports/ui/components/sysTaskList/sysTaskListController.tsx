import React, { useCallback, useMemo, useContext } from 'react';
import SysTaskList from './sysTaskList';
import SysTaskListItem from './sysTaskListItem';
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";

interface ISysTaskListControllerContext {
    tasksCompleto: IToDos[];
    tasksConcluidas: (string | undefined)[];
    tasksPendentes: (string | undefined)[];
}

export const SysTaskListControllerContext = React.createContext<ISysTaskListControllerContext>(
    {} as ISysTaskListControllerContext
);

const SysTaskListController: React.FC<{tasks: IToDos[], telaInicial: boolean, onEdit: any, onDelete: any}> = ({ tasks, telaInicial, onEdit, onDelete }) => {

    const gerandoTasksConcluidas: () => (string | undefined)[] = () => {
        return tasks.filter(task => task.situacao === "Concluída").map(task => task._id);
    }

    const gerandoTasksPendentes: () => (string | undefined)[] = () => {
        return tasks.filter(task => task.situacao == "Não Concluída").map(task => task._id);
    }

    const providerValues: ISysTaskListControllerContext = useMemo(
        () => ({
            tasksCompleto: tasks,
            tasksConcluidas: gerandoTasksConcluidas(),
            tasksPendentes: gerandoTasksPendentes(),
        }),
        [tasks]
    );

    return (
        <SysTaskListControllerContext.Provider value={providerValues}>
            <SysTaskList telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete} />
        </SysTaskListControllerContext.Provider>
    );
};

export default SysTaskListController;