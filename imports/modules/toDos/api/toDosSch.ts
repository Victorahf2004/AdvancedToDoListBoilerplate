import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const toDosSch: ISchema<IToDos> = {
	
	descricao: {
		type: String,
		label: 'Descrição',
		defaultValue: '',
		optional: false
	},
	
	situacao: {
		type: String,
		label: 'Situação',
		defaultValue: 'Não Concluída',
		optional: false,
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
	descricao: string;
	situacao: string;
	ehTarefaPessoal: boolean;
	owner: string;
}
