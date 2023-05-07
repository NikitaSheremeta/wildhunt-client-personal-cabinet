const state = {
  isMenuActive: false,
  history: []
};

const getters = {
  GET_IS_MENU_ACTIVE: (state) => state.isMenuActive,
  GET_HISTORY: (state) => state.history
};

const actions = {
  async MENU_ACTIVE({ commit }, req) {
    commit('SET_MENU_ACTIVE', req);
  },
  async ADD_HISTORY_ITEM({ commit }, req) {
    commit('ADD_HISTORY_ITEM', req);
  },
  async REMOVE_HISTORY_ITEM({ commit }) {
    commit('REMOVE_HISTORY_ITEM');
  }
};

const mutations = {
  SET_MENU_ACTIVE: (state, params) => (state.isMenuActive = params),
  ADD_HISTORY_ITEM: (state, params) => state.history.push(params),
  REMOVE_HISTORY_ITEM: (state) => state.history.pop()
};

export default {
  state,
  getters,
  actions,
  mutations
};
