import { createStore } from 'vuex';
import auth from '../api/auth';

export default createStore({
  state: {
    user: {},
    isAuth: false
  },
  getters: {
    GET_USER: (state) => state.user
  },
  mutations: {
    SET_USER: (state, params) => (state.user = params || {}),
    SET_AUTH: (state, params) => (state.isAuth = params)
  },
  actions: {
    async LOGIN({ commit }, req) {
      try {
        const { data: response } = await auth.login(req.login, req.password);

        localStorage.setItem('token', response.data.accessToken);

        commit('SET_AUTH', true);
        commit('SET_USER', response.user);

        return response;
      } catch (err) {
        console.log('[login]: ' + err.message);
      }
    },
    async SIGNUP({ commit }, req) {
      try {
        const { data: response } = await auth.signup(
          req.username,
          req.email,
          req.password
        );

        localStorage.setItem('token', response.accessToken);

        commit('SET_AUTH', true);
        commit('SET_USER', response.user);

        return response;
      } catch (err) {
        console.log('[signup]: ' + err.message);
      }
    },
    async LOGOUT({ commit }) {
      try {
        const { data: response } = await auth.logout();

        localStorage.removeItem('token');

        commit('SET_AUTH', false);
        commit('SET_USER', {});

        return response;
      } catch (err) {
        console.log('[logout]: ' + err.message);
      }
    },
    async FORGOT_PASSWORD(state, req) {
      try {
        const { data: response } = await auth.forgotPassword(req.email);

        return response;
      } catch (err) {
        console.log('[forgot-password]: ' + err.message);
      }
    }
  }
});
