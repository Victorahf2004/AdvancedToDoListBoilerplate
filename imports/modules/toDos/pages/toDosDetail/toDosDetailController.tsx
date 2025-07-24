import React, { useCallback, useContext } from 'react';
import ToDosDetailView from './toDosDetailView';
import { useNavigate } from 'react-router-dom';
import { ToDosModuleContext } from '../../toDosContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import { IToDos } from '../../api/toDosSch';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import ToDosListController from '../toDosList/toDosListController';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ShowDrawer } from '/imports/ui/appComponents/showDrawer/showDrawer';
import { Box } from '@mui/material';
import Context, { IToDosDetailContext } from './toDosDetailContext';

const ToDosDetailController = () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
	const { id, state } = useContext(ToDosModuleContext);
	const { showNotification } = useContext(AppLayoutContext);
	const { user } = useContext<IAuthContext>(AuthContext);
	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? toDosApi.subscribe('toDosList', { _id: id }) : null;
		const document = id && subHandle?.ready() ? toDosApi.findOne({ _id: id }) : {};
		return {
			document: (document as IToDos) ?? ({ _id: id } as IToDos),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const task: Partial<IToDos> = useTracker(() => toDosApi.findOne({_id: document._id}));

	const openMenu = (event: React.MouseEvent<Element>) => {
		setAnchorEl(event.currentTarget);
	};
	
	const closeMenu = () => {
		setAnchorEl(null);
	};
		
	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/toDos/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: IToDos) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		toDosApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
				});
			}
			else {
				showNotification({
					type: 'error',
					title: 'Erro ao realizar operação',
					message: e.reason || 'Ocorreu um erro ao tentar salvar o exemplo.'
				});
			} 
		});
	}, [document, state, user]);

	const onDeleteButtonClick = useCallback((task: any) => {	
		const tituloTarefa = task.title;
		toDosApi.remove(task, (e: IMeteorError) => {
				if (!e) {
					showNotification({
						type: 'success',
						title: 'Tarefa excluída!',
						message: `A tarefa foi excluída com sucesso!`
					});
				}
				else {
					showNotification({
						type: 'error',
						title: 'Erro ao excluir tarefa',
						message: e.reason || 'Ocorreu um erro ao tentar excluir a tarefa.'
					});
				}
			});
		closePage();
		}, []);
	
	const contextValues: IToDosDetailContext = {
		closePage,
		document: { ...document, _id: id },
		loading,
		schema: toDosApi.getSchema(),
		onSubmit,
		changeToEdit,
		anchorEl,
		openMenu,
		closeMenu,
		onDeleteButtonClick,
		task,
	}
	return (
		<Context.Provider
			value={contextValues}>
			<>
				{state == "create" || state == "edit"? (
					<>
						<ToDosListController />
						<Dialog open={true} onClose={closePage}>
							<DialogContent>
								<ToDosDetailView />
							</DialogContent>
						</Dialog>
					</>
					): (
						<Box display={"flex"}>
							<ToDosListController />
							<ShowDrawer open={true} onClose={closePage} anchor={"right"} variant={"permanent"}>
								<ToDosDetailView />
							</ShowDrawer>
						</Box> 
					)
				}
			</>
		</Context.Provider>
	);
};

export default ToDosDetailController;
