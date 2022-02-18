import $api from './index';

export default class Auth {
  static async login(login, password) {
    return $api.post('/lk-api/login', { login, password });
  }

  static async signup(username, email, password) {
    return $api.post('/lk-api/signup', { username, email, password });
  }

  static async logout() {
    return $api.post('/lk-api/logout');
  }

  static async forgotPassword(email) {
    return $api.post('/lk-api/forgot-password', { email });
  }
}
