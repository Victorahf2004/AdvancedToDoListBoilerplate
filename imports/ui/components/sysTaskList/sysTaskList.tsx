import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SysTaskListItemController from "./sysTaskListItemController";
import { SysTaskListControllerContext } from "./sysTaskListController";
import Divider from "@mui/material/Divider";
import { SysAccordion } from "../sysAccordion/sysAccordion";
import SysIcon from "../sysIcon/sysIcon";
import React, {useEffect} from "react";

const SysTaskList: React.FC<{telaInicial: boolean, onEdit: any, onDelete: any}> = ({ telaInicial, onEdit, onDelete }) => {
    let contador: number = 0;
    const controller = React.useContext(SysTaskListControllerContext);

    return (
        <>
            {telaInicial? (
                <>
                <List>
                    {controller.tasksCompleto.map((task) => (
                        <SysTaskListItemController key={task._id} taskId={task._id} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
                    ))}
                </List>
                </>
            ): (
                <>
                <SysAccordion titulo={`Não Concluídas (${controller.tasksPendentes.length})`} expandIcon={ <SysIcon name={"arrowDropDown"} /> } aberta={true} posicaoIcone={"inicio"} conteudo={
                <List>
                    {controller.tasksPendentes.map((taskId) => (
                        <React.Fragment key={taskId}>
                            <Divider />
                                <SysTaskListItemController key={taskId} taskId={taskId} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
                } />
                <SysAccordion titulo={`Concluídas (${controller.tasksConcluidas.length})`} expandIcon={ <SysIcon name={"arrowDropDown"} /> } aberta={true} posicaoIcone={"inicio"} conteudo={
                <List>
                    {controller.tasksConcluidas.map((taskId) => (
                        <React.Fragment key={taskId}>
                            <Divider />
                                <SysTaskListItemController key={taskId} taskId={taskId} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
                } />
                </>
            )
            }
        </>
    )
}

export default SysTaskList;