import {Ref, ref} from 'vue';

interface State {}

export class UiStore {

  protected state: Ref<State>;

  constructor(state: State) {
    this.state = ref<State>(state);
  }

  public getters = {}
}

export const register = async () => {
  const state: State = {};
  const store = new UiStore(state);
  return {
    uiStore: store,
  };
};

export default UiStore;


