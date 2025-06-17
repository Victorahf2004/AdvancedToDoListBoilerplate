import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
// import HomeStyles from './homeStyle';
import HomeSectionComponents from "/imports/sysPages/pages/home/sections/componentTests";
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { TarefasRecentes } from './sections/TarefasRecentes';

const Home: React.FC = () => {
	const { Container, Header, } = HomeStyles;
	const { user } = useContext<IAuthContext>(AuthContext);
	return (
		<Container>
		<Header>
				<Typography variant="h3">Olá, {user?.username} </Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Bem vindo ao Advanced To Do List com BoilerPlate!
				</Typography>
			</Header>
			<Typography variant="h3">Atividades Recentes </Typography>
			<TarefasRecentes />
			{/* <HomeSectionNotificacoes />
			<HomeSectionDialogs />
		<HomeSectionComponents /> */}
		</Container>
	);
};

export default Home;
