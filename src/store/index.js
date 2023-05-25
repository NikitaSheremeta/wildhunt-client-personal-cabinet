import { createStore } from 'vuex';
import common from '@/store/modules/common';
import authorization from '@/store/modules/authorization';

const state = {
  ...common.state,
  ...authorization.state
};

const getters = {
  ...common.getters,
  ...authorization.getters
};

const actions = {
  ...common.actions,
  ...authorization.actions
};

const mutations = {
  ...common.mutations,
  ...authorization.mutations
};

export default createStore({
  state,
  getters,
  actions,
  mutations
});
