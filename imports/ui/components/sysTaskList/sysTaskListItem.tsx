import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTracker } from 'meteor/react-meteor-data'; 
import React, {useEffect} from "react";
import { SysButton } from "/imports/ui/components/SimpleFormFields/SysButton/SysButton";
import SysIcon from "../sysIcon/sysIcon";

const SysTaskListItem: React.FC<{task: IToDos, telaInicial: boolean, onEdit: any, onDelete: any}> = ({ task, telaInicial, onEdit, onDelete }) => {

    let situacao: boolean = useTracker(() => {
        return task.type === "Concluída";
    })

    return (
        <ListItem key={task._id}>
            <FormControlLabel
                control={
                    <Checkbox checked={situacao} onChange={() => {situacao = !situacao}}/>
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