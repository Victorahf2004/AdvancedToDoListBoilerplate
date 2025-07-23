import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IToDos } from "/imports/modules/toDos/api/toDosSch";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SysTaskListItemController from "./sysTaskListItem/sysTaskListItemController";
import SysTaskListContext, { ISysTaskListContext } from "./sysTaskListContext";
import Divider from "@mui/material/Divider";
import { SysAccordion } from "../sysAccordion/sysAccordion";
import SysIcon from "../sysIcon/sysIcon";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";

const SysTaskListView: React.FC<{telaInicial: boolean, onEdit: any, onDelete: any}> = ({ telaInicial, onEdit, onDelete }) => {
    
    const context = React.useContext<ISysTaskListContext>(SysTaskListContext);

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            {telaInicial? (
                <>
                <List>
                    {context.tasksCompleto.map((task) => (
                        <>
                            <Divider />    
                            <SysTaskListItemController key={task._id} taskId={task._id} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
                            <Divider />
                        </>
                    ))}
                </List>
                </>
            ): (
                <>
                <SysAccordion titulo={`Não Concluídas (${context.tasksPendentes.length})`} expandIcon={ <SysIcon name={"arrowDropDown"} /> } aberta={true} posicaoIcone={"inicio"} conteudo={
                <List>
                    {context.tasksPendentes.map((taskId) => (
                        <React.Fragment key={taskId}>
                            <Divider />
                                <SysTaskListItemController key={taskId} taskId={taskId} telaInicial={telaInicial} onEdit={onEdit} onDelete={onDelete}/>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
                } />
                <SysAccordion titulo={`Concluídas (${context.tasksConcluidas.length})`} expandIcon={ <SysIcon name={"arrowDropDown"} /> } aberta={true} posicaoIcone={"inicio"} conteudo={
                <List>
                    {context.tasksConcluidas.map((taskId) => (
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
        </Box>
    )
}

export default SysTaskListView;