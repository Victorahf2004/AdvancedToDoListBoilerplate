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
        <Container>
            <Header>
                <Typography variant="h3">Olá, {user?.username} este é o Home 2 </Typography>
                <Typography variant="body1" textAlign={'justify'}>
                    Bem vindo ao Advanced To Do List com BoilerPlate!
                </Typography>
            </Header>
            <Typography variant="h3">Atividades Recentes </Typography>
            <SysTaskListController tasks={controller.todoList} telaInicial={true} onEdit={false} onDelete={false}/>
            <SysButton onClick={controller.onTaskButtonClick}> {"Ir para Tarefas >>>"} </SysButton>
        </Container>
    );
}