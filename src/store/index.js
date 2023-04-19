import { createStore } from 'vuex';
import authorization from '@/store/modules/authorization';

const state = {
  ...authorization.state
};

const getters = {
  ...authorization.getters
};

const actions = {
  ...authorization.actions
};

const mutations = {
  ...authorization.mutations
};

export default createStore({
  state,
  getters,
  actions,
  mutations
});
