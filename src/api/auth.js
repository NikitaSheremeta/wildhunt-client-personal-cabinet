import $api from './index';

export default class Auth {
  static async login(login, password) {
    return $api.post('/login', { login, password });
  }

  static async signup(username, email, password) {
    return $api.post('/signup', { username, email, password });
  }

  static async logout() {
    return $api.post('/logout');
  }
}
