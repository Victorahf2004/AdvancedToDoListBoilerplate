// region Imports
import { ProductBase } from '../../../api/productBase';
import { toDosSch, IToDos } from './toDosSch';
import { IMeteorError } from '/imports/typings/IMeteorError';

class ToDosApi extends ProductBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}

	countTasks = (query: Object, callback: (error: IMeteorError, result: number) => void) =>
		this.callMethod("countTasks", query, callback);
}

export const toDosApi = new ToDosApi();
