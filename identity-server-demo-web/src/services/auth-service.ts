import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: 'https://localhost:5001/',
      client_id: 'identity-server-demo-web',
      redirect_uri: 'http://localhost:3006/signin-callback.html',
      monitorSession: false,
      post_logout_redirect_uri: 'http://localhost:3006/',
      response_type: 'code', // for Auth Code flow
      scope: 'read openid profile email',
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
