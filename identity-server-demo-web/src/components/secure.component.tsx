import { User } from 'oidc-client';
import * as React from 'react';
import { ReactElement, useState } from 'react';
import { useEffect } from 'react';
import ReactJson from 'react-json-view';
import { ToastContainer, toast } from 'react-toastify';
import { ApiService } from '../services/api-service';
import { AuthService } from '../services/auth-service';

export default function Secure(): ReactElement {
  const authService: AuthService = new AuthService();
  const apiService: ApiService = new ApiService();
  const [user, setUser] = useState<User>();
  const [apiResponse, setApiResponse] = useState();

  const getUser = () => {
    authService.getUser().then((user: any) => {
      if (user) {
        console.log("User details: " + JSON.stringify(user));
        toast.success('User has been successfully loaded from store.');
      } else {
        toast.info('You are not logged in.');
      }
      
      setUser(user);
    });
  };

  const logout = () => {
    authService.logout();
  };

  const callApi = () => {
    apiService
      .callApi()
      .then((data: { data: any; }) => {
        setApiResponse(data.data);
        toast.success('Api return successfully data, check in section - Api response');
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className='row'>
      <div className='col-md-12 text-center' style={{ marginTop: '30px' }}>
        <button
          className='btn btn-secondary btn-getuser'
          style={{ margin: '10px' }}
          onClick={getUser}
        >
          Get User Info
        </button>
        <button
          className='btn btn-warning btn-getapi'
          style={{ margin: '10px' }}
          onClick={callApi}
        >
          Call API
        </button>
        <button
          className='btn btn-dark btn-logout'
          style={{ margin: '10px' }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12 text-left' style={{ marginTop: '30px' }}>
          {user && <ReactJson src={user} name="user" displayDataTypes={false} quotesOnKeys={false} />}
      </div>
    </div>
    </>
  );
}
