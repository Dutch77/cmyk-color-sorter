import {LocationStore} from '../Modules/Map/Store/LocationStore';

interface PluginContext {
  locationStore: LocationStore
}

export default (async (context: PluginContext) => {
  return {
    // foo: context.locationStore.getters,
    foo: context.locationStore.getters.locations,
    // foo: 'foo'
  };
});
