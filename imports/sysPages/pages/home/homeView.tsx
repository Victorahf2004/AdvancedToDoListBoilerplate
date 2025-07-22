import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeStyles from './homeStyles';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { HomeControllerContext } from './homeController';
import { List } from '@mui/material';
import SysTaskListController from '/imports/ui/components/sysTaskList/sysTaskListController';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';

export const HomeView: React.FC = () => {
    const { Container, Header } = HomeStyles;
    const { user } = useContext<IAuthContext>(AuthContext);
    const controller = useContext(HomeControllerContext);
    return (
        <Container sx={{ "width": "100%", "height": "100%"}}>
            <Header>
                <Typography variant="h3">Olá, {user?.username} </Typography>
            </Header>
            <Typography variant="body1">
                Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
            </Typography>
            <Typography variant="h3"> Adicionadas Recentemente</Typography>
            <SysTaskListController tasks={controller.todoList} telaInicial={true} onEdit={false} onDelete={false}/>
            <Box display={"flex"} justifyContent={"center"} width={"100%"} >
                <SysButton onClick={controller.onTaskButtonClick}> {"Ir para Tarefas >>>"} </SysButton>
            </Box>
        </Container>
    );
}