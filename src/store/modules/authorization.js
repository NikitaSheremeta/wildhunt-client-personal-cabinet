import auth from '@/api/auth';
import axios from 'axios';
import { debounce } from '@/helpers/debounce';

const state = {
  user: {},
  isLoading: false,
  isAuth: false
};

const getters = {
  GET_IS_LOADING: (state) => state.isLoading,
  GET_IS_AUTH: (state) => state.isAuth,
  GET_USER: (state) => state.user
};

const actions = {
  async LOGIN({ commit }, req) {
    try {
      const { data: response } = await auth.login(req.login, req.password);

      localStorage.setItem('token', response.data['accessToken']);

      commit('SET_AUTH', true);
      commit('SET_USER', response.data.user);

      return response.data;
    } catch (error) {
      console.log('[login]: ' + error.message);
    }
  },
  async SIGNUP({ commit }, req) {
    try {
      const { data: response } = await auth.signup(req.username, req.email, req.password);

      localStorage.setItem('token', response.data['accessToken']);

      commit('SET_AUTH', true);
      commit('SET_USER', response.data.user);

      return response.data;
    } catch (error) {
      console.log('[signup]: ' + error.message);
    }
  },
  async LOGOUT({ commit }) {
    try {
      const { data: response } = await auth.logout();

      localStorage.removeItem('token');

      commit('SET_AUTH', false);
      commit('SET_USER', {});

      return response.data;
    } catch (error) {
      console.log('[logout]: ' + error.message);
    }
  },
  async FORGOT_PASSWORD(state, req) {
    try {
      const { data: response } = await auth.forgotPassword(req.email);

      return response.data;
    } catch (error) {
      console.log('[forgot-password]: ' + error.message);
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
    } catch (error) {
      console.log('[check-auth]: ' + error.message);
    } finally {
      debounce(() => commit('SET_LOADING', false))();
    }
  }
};

const mutations = {
  SET_LOADING: (state, params) => (state.isLoading = params),
  SET_AUTH: (state, params) => (state.isAuth = params),
  SET_USER: (state, params) => (state.user = params || {})
};

export default {
  state,
  getters,
  actions,
  mutations
};
