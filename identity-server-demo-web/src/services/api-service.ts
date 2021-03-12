import axios from 'axios';
import { Constants } from '../helpers/constants';
import { AuthService } from './auth-service';

export class ApiService {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async callApi(): Promise<any> {
    const user = await this.authService.getUser();
    if (user && user.access_token) {
      return this._callApi(user.access_token).catch(error => {
        if (error.response.status === 401) {
          throw new Error('User is not logged in');
        }
        throw error;
      });
    } else if (user) {
      throw new Error('User is not logged in');
    }
  }

  private _callApi(token: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot + 'weatherforecast', {
      headers
    });
  }
}
