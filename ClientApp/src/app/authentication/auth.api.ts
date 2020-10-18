import { Api } from '../core/api';
import { User } from './user.model';

export class AuthApi extends Api {
  async signIn(user: User): Promise<{user: User, token: string}> {
    return await this.httpClient.post<{user: User, token: string}>('https://localhost:44324/api/Auth/SignIn', user).toPromise();
  }
}
