import React, { useCallback, useMemo } from 'react';
import { HomeView } from './homeView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IToDos } from '../../../modules/toDos/api/toDosSch';
import { toDosApi } from '../../../modules/toDos/api/toDosApi';
import { useContext } from 'react';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
    sortProperties: { field: string; sortAscending: boolean };
    filter: Object;
    searchBy: string | null;
    viewComplexTable: boolean;
    nome: String;
}

interface IHomeContollerContext {
    onAddButtonClick: () => void;
    onDeleteButtonClick: (row: any) => void;
    onEditButtonClick: (task: any) => void;
    onTaskButtonClick: () => void;
    todoList: IToDos[];
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HomeControllerContext = React.createContext<IHomeContollerContext>(
    {} as IHomeContollerContext
);

const initialConfig = {
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy: null,
    viewComplexTable: false,
    nome: ''
};

const HomeController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

    const navigate = useNavigate();

    const { showNotification } = useContext(AppLayoutContext);
    const { sortProperties, filter, nome } = config;
    const sort = {
        [sortProperties.field]: sortProperties.sortAscending ? 1 : -1
    };

    const numeroDeTasksPaginaInicial = 5;
    const { loading, toDos } = useTracker(() => {
        const subHandle = toDosApi.subscribe('toDosList', {}, {sort: {lastupdate: -1}, limit: numeroDeTasksPaginaInicial});

        const toDos = subHandle?.ready() ? toDosApi.find({}).fetch() : [];
        return {
            toDos,
            loading: !!subHandle && !subHandle.ready(),
            total: subHandle ? subHandle.total : toDos.length
        };
    }, [config]);

    const onTaskButtonClick = useCallback(() => {
        navigate("/toDos");
    }, [])
    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/toDos/create/${newDocumentId}`);
    }, []);
    const onEditButtonClick = useCallback((task: any) => {
            navigate('/toDos/edit/' + task._id);
    }, []);
    
    const onDeleteButtonClick = useCallback((task: any) => {
        toDosApi.remove(task, (e: IMeteorError) => {
            if (!e) {
                showNotification({
                    type: 'success',
                    title: 'Tarefa excluída!',
                    message: `A tarefa ${task.title} foi excluída com sucesso!`
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

    const providerValues: IHomeContollerContext = useMemo(
        () => ({
            onAddButtonClick,
            onDeleteButtonClick,
            onEditButtonClick,
            onTaskButtonClick,
            todoList: toDos,
            loading,
            onChangeTextField,
            onChangeCategory: onSelectedCategory,
        }),
        [toDos, loading]
    );

    return (
        <HomeControllerContext.Provider value={providerValues}>
            <HomeView />
        </HomeControllerContext.Provider>
    );
};

export default HomeController;