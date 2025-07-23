import React, { useCallback, useMemo, useContext } from 'react';
import SysTaskList from './sysTaskListView';
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import Context, { ISysTaskListContext } from './sysTaskListContext';

const SysTaskListController: React.FC<{tasks: IToDos[], telaInicial: boolean, onEdit: any, onDelete: any}> = ({ tasks, telaInicial, onEdit, onDelete }) => {

    const gerandoTasksConcluidas: () => (string | undefined)[] = () => {
        return tasks.filter(task => task.situacao === "Concluída").map(task => task._id);
    }

    const gerandoTasksPendentes: () => (string | undefined)[] = () => {
        return tasks.filter(task => task.situacao == "Não Concluída").map(task => task._id);
    }

    const providerValues: ISysTaskListContext = useMemo(
        () => ({
            tasksCompleto: tasks,
            tasksConcluidas: gerandoTasksConcluidas(),
            tasksPendentes: gerandoTasksPendentes(),
        }),
        [tasks]
    );

    return (
        <Context.Provider value={providerValues}>
            <SysTaskList telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete} />
        </Context.Provider>
    );
};

export default SysTaskListController;