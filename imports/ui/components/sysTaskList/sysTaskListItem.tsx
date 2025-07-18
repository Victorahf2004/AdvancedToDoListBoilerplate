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
import { SysTaskListItemControllerContext } from "./sysTaskListItemController";
import { SysTabs } from "../sysTabs/sysTabs";
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

const SysTaskListItem: React.FC<{taskId: string | undefined, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ taskId, telaInicial, onEdit, onDelete }) => {
    
    const {task, situacao, checkBoxClick, seeTaskInfo} = useContext(SysTaskListItemControllerContext);
    const navigate = useNavigate();

    return (
        <ListItem>
            <FormControlLabel
                control={
                    <Checkbox checked={situacao} onChange={checkBoxClick} />
                }
                label={
                    <ButtonBase onClick={() => seeTaskInfo(task)}>
                        <ListItemText primary={task?.descricao} secondary={`Criado por: ${task?.owner}`} />
                    </ButtonBase>
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