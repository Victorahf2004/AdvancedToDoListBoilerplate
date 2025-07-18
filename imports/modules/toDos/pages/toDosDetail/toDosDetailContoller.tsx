import React, { createContext, useCallback, useContext } from 'react';
import ToDosDetailView from './toDosDetailView';
import { useNavigate } from 'react-router-dom';
import { ToDosModuleContext } from '../../toDosContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { toDosApi } from '../../api/toDosApi';
import { IToDos } from '../../api/toDosSch';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { IUserProfile } from 'imports/modules/userprofile/api/userProfileSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import ToDosListController from '../toDosList/toDosListController';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ShowDrawer } from '/imports/ui/appComponents/showDrawer/showDrawer';


interface IToDosDetailContollerContext {
	closePage: () => void;
	document: IToDos;
	loading: boolean;
	schema: ISchema<IToDos>;
	onSubmit: (doc: IToDos) => void;
	changeToEdit: (id: string) => void;
}

export const ToDosDetailControllerContext = createContext<IToDosDetailContollerContext>(
	{} as IToDosDetailContollerContext
);

const ToDosDetailController = () => {
	const navigate = useNavigate();
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

	return (
		<ToDosDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: toDosApi.getSchema(),
				onSubmit,
				changeToEdit,
			}}>
			<>
				<ToDosListController />
				{state == "create" || state == "edit"? (
					<Dialog open={true} onClose={closePage}>
						<DialogContent>
							<ToDosDetailView />
						</DialogContent>
					</Dialog>): (
					<ShowDrawer open={true} onClose={closePage} anchor={"right"} variant={"persistent"}>
						<ToDosDetailView />
					</ShowDrawer> )
				}
			</>
		</ToDosDetailControllerContext.Provider>
	);
};

export default ToDosDetailController;
