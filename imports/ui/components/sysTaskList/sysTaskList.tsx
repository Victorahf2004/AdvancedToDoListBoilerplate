import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SysTaskListItemController from "./sysTaskListItemController";
import Divider from "@mui/material/Divider";
import React, {useEffect} from "react";

const SysTaskList: React.FC<{tasks: IToDos[], telaInicial: boolean, onEdit: any, onDelete: any}> = ({ tasks, telaInicial, onEdit, onDelete }) => {
    let contador: number = 0;
    return (
        <List>
            {tasks.map((task) => (
                <SysTaskListItemController key={task._id} taskId={task._id} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
            ))}
            <Divider />
        </List>
    )
}

export default SysTaskList;