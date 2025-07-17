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
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SysTaskListItem: React.FC<{taskId: string | undefined, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ taskId, telaInicial, onEdit, onDelete }) => {
    
    const {task, situacao, checkBoxClick, seeTaskInfo, anchorEl, openMenu, closeMenu} = useContext(SysTaskListItemControllerContext);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    return (
        <ListItem>
            <FormControlLabel
                control={
                    <Checkbox checked={situacao} onChange={checkBoxClick} />
                }
                label={
                    <ButtonBase onClick={() => seeTaskInfo(task)}>
                        <ListItemText primary={task?.titulo} secondary={`Criado por: ${task?.owner}`} />
                    </ButtonBase>
                }
            />
            {!telaInicial && (
                <Box display="flex" justifyContent={"flex-end"} width="100%">
                    <ButtonBase onClick={openMenu}>
                        <SysIcon name={"moreVert"} onClick={openMenu}/>
                    </ButtonBase>
                    <Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
                        <MenuItem onClick={() => onEdit(task)}>
                            <SysIcon name={"edit"} />
                            Editar
                        </MenuItem>
                        <MenuItem onClick={() => onDelete(task)}>
                            <SysIcon name={"delete"} />
                            Excluir
                        </MenuItem>
                    </Menu>
                </Box>
            )}
        </ListItem>
    )
}

export default SysTaskListItem;