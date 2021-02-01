// app.config.globalProperties.$context = contextResolved;
import {context} from '../src/script/createApp';
import {ExtractAppContext} from '../src/script/DependecyInjection/di';
import {Router} from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $context: ExtractAppContext<typeof context>
    $router: Router
  }
}
