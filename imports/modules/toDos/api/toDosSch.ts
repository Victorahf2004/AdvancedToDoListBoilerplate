import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const toDosSch: ISchema<IToDos> = {
	
	titulo: {
		type: String,
		label: 'Título',
		defaultValue: '',
		optional: false,
	},

	descricao: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: true,
	},
	
	situacao: {
		type: String,
		label: 'Situação',
		defaultValue: 'Não Concluída',
		optional: true,
		visibilityFunction: () => false,
		options: () => [
			{ value: 'Não Concluída', label: 'Não Concluída' },
			{ value: 'Concluída', label: 'Concluída' },
		]
	},
	
	ehTarefaPessoal: {
		type: Boolean,
		label: 'Tipo',
		defaultValue: false,
		optional: false,
	},

	// tasks: {
	// 	type: [Object],
	// 	label: 'Tarefas',
	// 	defaultValue: '',
	// 	optional: true,
	// 	subSchema: {
	// 		name: {
	// 			type: String,
	// 			label: 'Nome da Tarefa',
	// 			defaultValue: '',
	// 			optional: true
	// 		},
	// 		description: {
	// 			type: String,
	// 			label: 'Descrição da Tarefa',
	// 			defaultValue: '',
	// 			optional: true
	// 		}
	// 	}
	// },
	owner: {
		type: String,
		label: 'Dono',
		defaultValue: '',
		optional: true,
		visibilityFunction: () => false,
	}
};

export interface IToDos extends IDoc {
	titulo: string;
	descricao: string;
	situacao: string;
	ehTarefaPessoal: boolean;
	owner: string;
}
