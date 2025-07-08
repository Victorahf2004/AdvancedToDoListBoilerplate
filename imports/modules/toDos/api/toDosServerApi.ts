// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { String } from 'lodash';
// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'toDosList',
			(filter = {}, options = {}) => {
				return this.defaultListCollectionPublication(filter, {
					...options,
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1, createdby: 1, lastupdate: 1, ehTarefaPessoal: 1, owner: 1 }
				});
			},
			async (doc: IToDos & { nomeUsuario: string }) => {
				const userProfileDoc: (Partial<IUserProfile>) = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc, owner: userProfileDoc?.username || 'Usuário Desconhecido' };
				// return { ...doc, owner: "Teste" };
			}
		);

		this.addPublication('toDosDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					contacts: 1,
					title: 1,
					description: 1,
					type: 1,
					typeMulti: 1,
					date: 1,
					files: 1,
					chip: 1,
					statusRadio: 1,
					statusToggle: 1,
					slider: 1,
					check: 1,
					address: 1,
					owner: 1,
				}
			});
		});

		this.registerMethod("countTasks", this.countTasks.bind(this));
		// this.registerMethod("adicionarOwnerAoDoc", this.adicionarOwnerAoDoc.bind(this));
	}
	public async countTasks(query: Object): Promise<number> {
		console.log("Contando tarefas com query: ", query);
		const result = await this.getCollectionInstance().find(query).countAsync();
		console.log("Resultado é: ", result);
		return result;
	}
	// public async adicionarOwnerAoDoc(selectedAction: string, usuarioAtual: string, doc: Partial<IToDos>): Promise<Partial<IToDos>> {
	// 	if (selectedAction == "insert"){
	// 		return { ...doc, owner: usuarioAtual };
	// 	}
	// 	else {
	// 		console.log("Ação é: ", selectedAction);
	// 		console.log("Doc.createdby é: ", doc.createdby);
	// 		const userProfileDoc: (Partial<IUserProfile>) = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
	// 		const username = userProfileDoc?.username || 'Usuário Desconhecido';
	// 		console.log("Username é: ", username);
	// 		return { ...doc, owner: username };
	// 	}
	// }
}

export const toDosServerApi = new ToDosServerApi();
