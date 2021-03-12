import { ReactElement } from 'react';
import { AuthService } from '../services/auth-service';

export default function Home(): ReactElement {
   const authService: AuthService = new AuthService();

  const login = () => {
    authService.login();
  };

  return (
    <>
      <div className='row'>
        <div className='col-md-12 text-center' style={{ marginTop: '30px' }}>
          <button
            className='btn btn-primary btn-login'
            style={{ margin: '10px' }}
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
