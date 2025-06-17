import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SysTaskListItem from "./sysTaskListItem";
import React, {useEffect} from "react";

const SysTaskList: React.FC<{tasks: IToDos[]}> = ({ tasks }) => {

    return (
        <List>
            {tasks.map((task) => (
                <SysTaskListItem task={task} />
            ))}
        </List>
    )
}

export default SysTaskList;