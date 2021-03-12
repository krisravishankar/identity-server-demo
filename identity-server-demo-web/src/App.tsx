import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import Home from './components/home.component';
import NotFound from './components/not-found.component';
import { AuthService } from './services/auth-service';
import Secure from './components/secure.component';

const authService = new AuthService();
const requireLogin = async (to: any, from: any, next: any) => {
  if (to.meta.auth) {
    if (await authService.getUser()) {
      next();
    } else {
      authService.login();
    }
  } else {
    if (await authService.getUser()) {
      next.redirect('/secure');
    } else {
      next();
    }
  }
};

class App extends React.Component {
  public render() {
    return (
      <>
      <header className='App-header'>
        <h1 className='App-title'>Identity Server Demo Web</h1>
      </header>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='App'>
              <BrowserRouter>
                <GuardProvider guards={[requireLogin]} error={NotFound}>
                  <Switch>
                    <GuardedRoute path='/' exact component={Home} />
                    <GuardedRoute
                      path='/secure'
                      exact
                      component={Secure}
                      meta={{ auth: true }}
                    />
                    <GuardedRoute path='*' component={NotFound} />
                  </Switch>
                </GuardProvider>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;