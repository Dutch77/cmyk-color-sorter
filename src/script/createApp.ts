import {createApp} from 'vue';
import App from './App.vue';
import {createContext} from './DependecyInjection/di';
import {register as registerI18n} from './Module/I18n/createI18n';
import {register as registerLocalStoragePersister} from './Module/Persister/LocalStoragePersister';
import {register as registerAxios} from './Module/Axios/Axios';
import {register as registerRouter} from './Module/Router/Router';
import {register as registerUiStore} from './Layout/Store/UiStore';
import {readMeta} from "./Layout/Helper/MetaReader";

const mode = readMeta('mode');
const gitVersion = readMeta('gitVersion');

export const context = createContext({
        mode,
        gitVersion,
    })
        .register(registerI18n)
        .register(registerAxios)
        .register(registerRouter)
        .register(registerLocalStoragePersister)
        .register(registerUiStore)
;

(async () => {
    const contextResolved = await context.resolve();
    const {router} = contextResolved;

    const app = createApp(App);
    app.use(router);

    app.config.globalProperties.$context = contextResolved;
    app.mount('#app');
    window['app'] = app;
    window['appContext'] = contextResolved;
})();
