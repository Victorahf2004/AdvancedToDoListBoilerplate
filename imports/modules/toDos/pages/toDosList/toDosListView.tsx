import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { ToDosListControllerContext } from './toDosListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import ToDosListStyles from './toDosListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysTaskListController from '/imports/ui/components/sysTaskList/sysTaskListController';
import { SysTabs } from '/imports/ui/components/sysTabs/sysTabs';
import Pagination from '@mui/material/Pagination';

const ToDosListView = () => {
	const controller = React.useContext(ToDosListControllerContext);
	const sysLayoutContext = React.useContext(AppLayoutContext);
	const navigate = useNavigate();
  const {
    Container,
    LoadingContainer,
    SearchContainer
  } = ToDosListStyles;
	// const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.situacao.options?.() ?? [])];
  	console.log("ValorTab", controller.valueTab);
	console.log("Numero de páginas", controller.totalPaginas);
	return (
		<Container>
			<Typography variant="h5">Testeeeeeeeeee</Typography>
			<SysTabs abas={controller.abas} value={controller.valueTab} handleChange={controller.handleTabChange}/>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<SysTaskListController tasks={controller.todoList} telaInicial={false} onEdit={controller.onEditButtonClick} onDelete={controller.onDeleteButtonClick}/>
				</Box>
			)}

			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
			<Pagination count={controller.totalPaginas} page={controller.pageAtual} onChange={controller.alterarPagina} size="large" />
		</Container>
	);
};

export default ToDosListView;
