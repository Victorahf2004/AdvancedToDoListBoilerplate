// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { IMeteorUser } from 'imports/modules/userprofile/api/userProfileSch';
import User = Meteor.User;
import { String } from 'lodash';
import { IDoc } from '/imports/typings/IDoc';
import { IContext } from '/imports/typings/IContext';
// endregion

class ToDosServerApi extends ProductServerBase<IToDos> {
	constructor() {
		super('toDos', toDosSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;
		this.beforeUpdate = this.beforeUpdate.bind(this);
		this.beforeRemove = this.beforeRemove.bind(this);
		this.addTransformedPublication(
			'toDosList',
			(filter = {}, options = {}) => {
				return this.defaultListCollectionPublication(filter, {
					...options,
					projection: { titulo: 1, descricao: 1, situacao: 1, createdat: 1, createdby: 1, lastupdate: 1, ehTarefaPessoal: 1, owner: 1 }
				});
			},
			async (doc: IToDos & { nomeUsuario: string }) => {
				const userProfileDoc: (Partial<IUserProfile>) = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc, owner: userProfileDoc?.username || 'Usuário Desconhecido' };
			}
		);

		this.addPublication('toDosDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					titulo: 1,
					descricao: 1,
					situacao: 1,
					ehTarefaPessoal: 1,
					owner: 1,
				}
			});
		});

		this.registerMethod("countTasks", this.countTasks.bind(this));
	}
	public async countTasks(query: Object): Promise<number> {
		console.log("Contando tarefas com query: ", query);
		const result = await this.getCollectionInstance().find(query).countAsync();
		console.log("Resultado é: ", result);
		return result;
	}
	
	async beforeRemove(_docObj: any, _context: IContext) {
		const user: User | null = await Meteor.userAsync();
		const userId = user?._id;
		const docId = _docObj._id;
		const originalDoc = await this.getCollectionInstance().findOneAsync({_id: docId});
		if (userId != originalDoc.createdby){
			throw new Meteor.Error("not-authorized", "Você não pode remover o documento de outro usuário");
		}
		return super.beforeRemove(_docObj, _context);
	}
	async beforeUpdate(_docObj: IDoc | Partial<IDoc>, _context: IContext) {
		const user: User | null = await Meteor.userAsync();
		const userId = user?._id;
		const docId = _docObj._id;
		const originalDoc = await this.getCollectionInstance().findOneAsync({_id: docId});
		if (userId != originalDoc.createdby){
			throw new Meteor.Error("not-authorized", "Você não pode editar o documento de outro usuário");
		}
		return super.beforeUpdate(_docObj, _context);
	}
}

export const toDosServerApi = new ToDosServerApi();
