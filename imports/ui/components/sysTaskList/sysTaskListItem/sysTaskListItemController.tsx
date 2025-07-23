import React, { useCallback, useMemo, useContext } from 'react';
import SysTaskListItem from './sysTaskListItemView';
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Context, { ISysTaskListItemContext } from "./sysTaskListItemContext";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";


const SysTaskListItemController: React.FC<{taskId: string | undefined, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ taskId, telaInicial, onEdit, onDelete }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const task: Partial<IToDos> = useTracker(() => toDosApi.findOne({_id: taskId}));
    let situacao: boolean = task?.situacao === "Concluída";
    const navigate = useNavigate();
    const { showNotification } = useContext(AppLayoutContext);

    const openMenu = (event: React.MouseEvent<Element>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const checkBoxClick = () => {
        let novoTipo: string = !situacao? "Concluída" : "Não Concluída";
        const novaTask: any = {
            ...task,
            situacao: novoTipo,
        }
        console.log(`Task antes: ${JSON.stringify(novaTask)}`);
        toDosApi["update"](novaTask, (e: IMeteorError) => {
            if (!e) {
                showNotification({
                    type: 'success',
                    title: 'Operação realizada!',
                    message: `O exemplo foi atualizado com sucesso!`
                });
                console.log(`Task atualizada: ${JSON.stringify(novaTask)}`);
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

    const providerValues: ISysTaskListItemContext = useMemo(
        () => ({
            task,
            situacao,
            checkBoxClick,
            seeTaskInfo,
            anchorEl,
            openMenu,
            closeMenu,
        }),
        [task]
    );

    return (
        <Context.Provider value={providerValues}>
            <SysTaskListItem taskId={taskId} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete} />
        </Context.Provider>
    );
};

export default SysTaskListItemController;