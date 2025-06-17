import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTracker } from 'meteor/react-meteor-data'; 
import React, {useEffect} from "react";

const SysTaskListItem: React.FC<{task: IToDos}> = ({ task }) => {

    const situacao: boolean = useTracker(() => {
        return task.type === "Concluída";
    })

    return (
        <ListItem key={task._id}>
            <FormControlLabel
                control={
                    <Checkbox checked={situacao} />
                }
                label={
                    <ListItemText primary={task.title} secondary={`Criado por: ${task.owner}`} />
                }
            />
        </ListItem>
    )
}

export default SysTaskListItem;