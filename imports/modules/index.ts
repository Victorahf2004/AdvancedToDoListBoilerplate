import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Example from './example/config';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';
import ToDos from './toDos/config';

const pages: Array<IRoute | null> = [
	...ToDos.pagesRouterList,
	// ...Example.pagesRouterList, 
	// ...Aniversario.pagesRouterList, 
	// ...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...ToDos.pagesMenuItemList,
	// ...Example.pagesMenuItemList, 
	// ...Aniversario.pagesMenuItemList,
	// ...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
