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

interface IInitialConfig {
    sortProperties: { field: string; sortAscending: boolean };
    filter: Object;
    searchBy: string | null;
    viewComplexTable: boolean;
}

interface ISysTaskListItemControllerContext {
    task: Partial<IToDos>;
    situacao: boolean;
    checkBoxClick: () => void;
    seeTaskInfo: (task: Partial<IToDos>) => void;
}

export const SysTaskListItemControllerContext = React.createContext<ISysTaskListItemControllerContext>(
    {} as ISysTaskListItemControllerContext
);

const SysTaskListItemController: React.FC<{taskId: string | undefined, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ taskId, telaInicial, onEdit, onDelete }) => {

    const task: Partial<IToDos> = useTracker(() => toDosApi.findOne({_id: taskId}));
    let situacao: boolean = task?.situacao === "Concluída";
    const navigate = useNavigate();
    const { showNotification } = useContext(AppLayoutContext);

    const checkBoxClick = () => {
        let novoTipo: string = !situacao? "Concluída" : "Não Concluída";
        const novaTask: any = {
            ...task,
            situacao: novoTipo,
        }
        console.log(`Task antes: ${novaTask}`);
        toDosApi["update"](novaTask, (e: IMeteorError) => {
            if (!e) {
                showNotification({
                    type: 'success',
                    title: 'Operação realizada!',
                    message: `O exemplo foi atualizado com sucesso!`
                });
                console.log(`Task atualizada: ${novaTask}`);
            } else {
                showNotification({
                    type: 'error',
                    title: 'Operação não realizada!',
                    message: `Erro ao realizar a operação`
                });
            }
        });
    }

    const seeTaskInfo = useCallback((tarefa: any) => {
        navigate('/toDos/view/' + tarefa._id);
    }, []);

    const providerValues: ISysTaskListItemControllerContext = useMemo(
        () => ({
            task,
            situacao,
            checkBoxClick,
            seeTaskInfo,
        }),
        [task]
    );

    return (
        <SysTaskListItemControllerContext.Provider value={providerValues}>
            <SysTaskListItem taskId={taskId} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete} />
        </SysTaskListItemControllerContext.Provider>
    );
};

export default SysTaskListItemController;