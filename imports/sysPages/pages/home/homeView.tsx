import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyles';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import HomeContext, { IHomeContext } from './homeContext';
import { List } from '@mui/material';
import SysTaskListController from '/imports/ui/components/sysTaskList/sysTaskListController';
import SysTaskListItemController from '../../../ui/components/sysTaskList/sysTaskListItem/sysTaskListItemController';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';
import Divider from '@mui/material/Divider';

export const HomeView: React.FC = () => {
    const { Container, Header } = HomeStyles;
    const { user } = useContext<IAuthContext>(AuthContext);
    const context = useContext(HomeContext);
    const todoListCopia = [...context.todoList];
    const listaMenosPrimeiroElemento = todoListCopia.shift();
    return (
        <Container sx={{ "width": "100%", "height": "100%"}}>
            <Header>
                <Typography variant="h3">Olá, {user?.username} </Typography>
            </Header>
            <Typography variant="body1">
                Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
            </Typography>
            {context.todoList.length > 1? (
                <>
                    <Box display={"flex"} flexDirection={{ xs: 'column', md: 'row' }} gap={"3vw"} width={"100%"}>
                        <Typography variant="h3"> Adicionadas Recentemente</Typography>
                        <SysTaskListController tasks={[context.todoList[0]]} telaInicial={true} onEdit={context.onEditButtonClick} onDelete={context.onDeleteButtonClick}/>
                    </Box>
                    <SysTaskListController tasks={todoListCopia} telaInicial={true} onEdit={context.onEditButtonClick} onDelete={context.onDeleteButtonClick}/>
                </>
            ): context.todoList.length == 1? (
                <>
                    <Box display={"flex"} flexDirection={{ xs: 'column', md: 'row' }} gap={"3vw"} width={"100%"}>
                        <Typography variant="h3"> Adicionadas Recentemente</Typography>
                        <SysTaskListController tasks={[context.todoList[0]]} telaInicial={true} onEdit={context.onEditButtonClick} onDelete={context.onDeleteButtonClick}/>
                    </Box>
                </>
            ): (
                <></>
            )}
            <Box display={"flex"} justifyContent={"center"} width={"100%"} >
                <SysButton onClick={context.onTaskButtonClick}> {"Ir para Tarefas >>>"} </SysButton>
            </Box>
        </Container>
    );
}