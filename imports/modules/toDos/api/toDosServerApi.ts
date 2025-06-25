// region Imports
import { Recurso } from '../config/recursos';
import { toDosSch, IToDos } from './toDosSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
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
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1, createdby: 1, lastupdate: 1, ehTarefaPessoal: 1 }
				});
			},
			async (doc: IToDos & { nomeUsuario: string }) => {
				const userProfileDoc: (Partial<IUserProfile>) = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc, owner: userProfileDoc ? userProfileDoc.username : 'Sem autor' };
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
				}
			});
		});

	// 	this.addRestEndpoint(
	// 		'view',
	// 		(params, options) => {
	// 			console.log('Params', params);
	// 			console.log('options.headers', options.headers);
	// 			return { status: 'ok' };
	// 		},
	// 		['post']
	// 	);

	// 	this.addRestEndpoint(
	// 		'view/:toDosId',
	// 		(params, _options) => {
	// 			console.log('Rest', params);
	// 			if (params.toDosId) {
	// 				return self
	// 					.defaultCollectionPublication(
	// 						{
	// 							_id: params.toDosId
	// 						},
	// 						{}
	// 					)
	// 					.fetch();
	// 			} else {
	// 				return { ...params };
	// 			}
	// 		},
	// 		['get']
	// 	);
	}
}

export const toDosServerApi = new ToDosServerApi();
