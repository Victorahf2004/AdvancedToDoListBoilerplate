import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import ToDosListContext, { IToDosListContext } from './toDosListContext';
import { useNavigate } from 'react-router-dom';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDosListStyles from './toDosListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysTaskListController from '/imports/ui/components/sysTaskList/sysTaskListController';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';
import Pagination from '@mui/material/Pagination';

const ToDosListView = () => {
	const context = React.useContext(ToDosListContext);
	const sysLayoutContext = React.useContext(AppLayoutContext);
	const navigate = useNavigate();
  const {
    Container,
    LoadingContainer,
    SearchContainer
  } = ToDosListStyles;
	return (
		<Container>
			<SysTabs abas={context.abas} value={context.valueTab} handleChange={context.handleTabChange}/>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={context.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>
			{context.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<SysTaskListController tasks={context.todoList} telaInicial={false} onEdit={context.onEditButtonClick} onDelete={context.onDeleteButtonClick}/>
				</Box>
			)}
			<Box display={"flex"} justifyContent={"center"} width={"100%"}>
				<Pagination count={context.totalPaginas} page={context.pageAtual} onChange={context.alterarPagina} size="large" />
			</Box>
			<Box display={"flex"} justifyContent={"center"} width={"100%"}>
			<SysFab
					variant="extended"
					text="Adicionar"
					startIcon={<SysIcon name={'add'} />}
					onClick={context.onAddButtonClick}
				/>
			</Box>
		</Container>
	);
};

export default ToDosListView;
