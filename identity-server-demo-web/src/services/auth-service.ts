import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';
import { Constants } from '../helpers/constants';

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: Constants.authority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback.html`,
      monitorSession: false,
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: 'code', // for Auth Code flow
      scope: Constants.clientScope,
      userStore: new WebStorageStateStore({ store: window.localStorage }) // set this to save user info in localStorage
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
