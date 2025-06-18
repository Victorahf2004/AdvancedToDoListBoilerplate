import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTracker } from 'meteor/react-meteor-data'; 
import React, { createContext, useCallback, useContext } from 'react';
import { SysButton } from "/imports/ui/components/SimpleFormFields/SysButton/SysButton";
import { toDosApi } from "/imports/modules/toDos/api/toDosApi";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import SysIcon from "../sysIcon/sysIcon";

const SysTaskListItem: React.FC<{taskId: string | undefined, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ taskId, telaInicial, onEdit, onDelete }) => {
    const task = useTracker(() => toDosApi.findOne({_id: taskId}));
    let situacao: boolean = task.type === "Concluída";

    const { showNotification } = useContext(AppLayoutContext);

    const gerarNovaTask = () => {
        let novoTipo: string = !situacao? "Concluída" : "Não Concluída";
        const novaTask: any = {
            ...task,
            type: novoTipo,
        }
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

    return (
        <ListItem>
            <FormControlLabel
                control={
                    <Checkbox checked={situacao} onChange={gerarNovaTask} />
                }
                label={
                    <ListItemText primary={task.title} secondary={`Criado por: ${task.owner}`} />
                }
            />
            {!telaInicial && (
                <>
                <SysButton onClick={() => onEdit(task)}>
                    <SysIcon name={"edit"} />
                </SysButton>
                <SysButton onClick={() => onDelete(task)}>
                    <SysIcon name={"delete"} />
                </SysButton>
                </>
            )}
        </ListItem>
    )
}

export default SysTaskListItem;