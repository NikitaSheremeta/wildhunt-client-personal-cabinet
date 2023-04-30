const state = {
  isMenuActive: false
};

const getters = {
  GET_IS_MENU_ACTIVE: (state) => state.isMenuActive
};

const actions = {
  async MENU_ACTIVE({ commit }, req) {
    commit('SET_MENU_ACTIVE', req);
  }
};

const mutations = {
  SET_MENU_ACTIVE: (state, params) => (state.isMenuActive = params)
};

export default {
  state,
  getters,
  actions,
  mutations
};
