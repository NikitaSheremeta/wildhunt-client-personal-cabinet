import { createStore } from 'vuex';
import axios from 'axios';
import auth from '@/api/auth';
import { debounce } from '@/helpers/debounce';

export default createStore({
  state: {
    user: {},
    isLoading: false,
    isAuth: false
  },
  getters: {
    GET_IS_LOADING: (state) => state.isLoading,
    GET_IS_AUTH: (state) => state.isAuth,
    GET_USER: (state) => state.user
  },
  mutations: {
    SET_LOADING: (state, params) => (state.isLoading = params),
    SET_AUTH: (state, params) => (state.isAuth = params),
    SET_USER: (state, params) => (state.user = params || {})
  },
  actions: {
    async LOGIN({ commit }, req) {
      try {
        const { data: response } = await auth.login(req.login, req.password);

        localStorage.setItem('token', response.data['accessToken']);

        commit('SET_AUTH', true);
        commit('SET_USER', response.data.user);

        return response.data;
      } catch (err) {
        console.log('[login]: ' + err.message);
      }
    },
    async SIGNUP({ commit }, req) {
      try {
        const { data: response } = await auth.signup(req.username, req.email, req.password);

        localStorage.setItem('token', response.data['accessToken']);

        commit('SET_AUTH', true);
        commit('SET_USER', response.data.user);

        return response.data;
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

        return response.data;
      } catch (err) {
        console.log('[logout]: ' + err.message);
      }
    },
    async FORGOT_PASSWORD(state, req) {
      try {
        const { data: response } = await auth.forgotPassword(req.email);

        return response.data;
      } catch (err) {
        console.log('[forgot-password]: ' + err.message);
      }
    },
    async CHECK_AUTH({ commit }) {
      try {
        commit('SET_LOADING', true);

        const { data: response } = await axios.get('/lk-api/refresh', {
          withCredentials: true
        });

        localStorage.setItem('token', response.data['accessToken']);

        commit('SET_AUTH', true);
        commit('SET_USER', response.user);

        return response.data;
      } catch (err) {
        console.log('[check-auth]: ' + err.message);
      } finally {
        debounce(() => commit('SET_LOADING', false))();
      }
    }
  }
});
