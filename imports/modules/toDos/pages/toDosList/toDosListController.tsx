import React, { useCallback, useMemo, useContext, useEffect } from 'react';
import ToDosListView from './toDosListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from '../../api/toDosSch';
import { toDosApi } from '../../api/toDosApi';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import { IAba } from '/imports/ui/components/sysTabs/sysTabs';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
	valueTab: string;
	pageAtual: number;
	numeroPages: number;
}

interface IToDosListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (task: any) => void;
	onEditButtonClick: (task: any) => void;
	todoList: IToDos[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	valueTab: string;
	handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
	abas: IAba[];
	pageAtual: number;
	numeroPages: number;
	alterarPagina: (event: any, value: number) => void;
}

export const ToDosListControllerContext = React.createContext<IToDosListContollerContext>(
	{} as IToDosListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false,
	valueTab: "0",
	pageAtual: 1,
	numeroPages: 2,
};

const ToDosListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { user } = useContext<IAuthContext>(AuthContext);
	const { showNotification } = useContext(AppLayoutContext);
	const { title, type, typeMulti } = toDosApi.getSchema();
	const toDosSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();
	const abas: IAba[] = [
		{ label: "Minhas Tarefas", value: "0"},
		{ label: "Tarefas do Time", value: "1"}
	]

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const numeroTarefasPorPagina = 4;
	const { loading, toDoss, total } = useTracker(() => {
		let query = {};
		if (config.valueTab == "1") {
			const tarefasNaoPessoais = { ehTarefaPessoal: { $ne: true } };
			const tarefasOutrasPessoas = { owner: { $ne: user?.username} };
			query = { $and: [tarefasNaoPessoais, tarefasOutrasPessoas] };
		}
		else {
			query = { owner: user?.username };
		}
		
		let opcoesSkip = (config.pageAtual - 1) * numeroTarefasPorPagina;
		let options = { sort: {lastupdate: -1}, skip: opcoesSkip, limit: numeroTarefasPorPagina };
		const subHandle = toDosApi.subscribe('toDosList');

		let toDoss = subHandle?.ready() ? toDosApi.find(query, options).fetch() : [];

		return {
			toDoss,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : toDoss.length,
		};
	}, [config.valueTab, config.pageAtual]);

	// useEffect(() => {
	// 	toDosApi.countTasks((error, totalColecaoCompleta) => {
	// 		if (error) return showNotification({
	// 			type: "error",
	// 			title: "Erro ao contar tarefas",
	// 			message: error.message
	// 		});
	// 		let numeroPagesAtual = Math.ceil(totalColecaoCompleta / numeroTarefasPorPagina);
	// 		if (numeroPagesAtual < 1) {
	// 			numeroPagesAtual = 1;
	// 		}
	// 		setConfig((prev) => ({
	// 			...prev,
	// 			numeroPages: numeroPagesAtual,
	// 		}))
	// 	})
	// }, [config.valueTab]);
	// const gerandoNumeroPaginas = useTracker(() => {toDosApi.countTasks((error, totalColecaoCompleta) => {
		// 	if (error) return showNotification({
		// 		type: "error",
		// 		title: "Erro ao contar tarefas",
		// 		message: error.message
		// 	});
		// 	const numeroPagesAtual = Math.ceil(totalColecaoCompleta / numeroTarefasPorPagina);
		// 	setConfig((prev) => ({
		// 		...prev,
		// 		numeroPages: numeroPagesAtual,
		// 	}))
		// })
	// }, [toDoss]);
	
	const alterarPagina = useCallback((event: any, value: number) => {
		setConfig((prev) => ({
			...prev,
			pageAtual: value,
		}));
	}, []);
	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/toDos/create/${newDocumentId}`);
	}, []);

	const onEditButtonClick = useCallback((task: any) => {
		navigate('/toDos/edit/' + task._id);
	}, []);

	const onDeleteButtonClick = useCallback((task: any) => {
		if (task.owner != user?.username){
			showNotification({
				type: 'error',
				title: 'Ação não permitida!',
				message: 'Você não pode excluir tarefas de outros usuários.'
				})
			}
		else {
			toDosApi.remove(task);
		}
	}, []);

	const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
		setConfig((prev) => ({
			...prev,
			valueTab: newValue,
		}))
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const providerValues: IToDosListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			onEditButtonClick,
			todoList: toDoss,
			schema: toDosSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			valueTab: config.valueTab,
			handleTabChange,
			abas,
			pageAtual: config.pageAtual,
			numeroPages: config.numeroPages,
			alterarPagina,
		}),
		[toDoss, loading]
	);

	return (
		<ToDosListControllerContext.Provider value={providerValues}>
			<ToDosListView />
		</ToDosListControllerContext.Provider>
	);
};

export default ToDosListController;
