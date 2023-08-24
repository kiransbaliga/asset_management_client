import React, { useState, FC, useEffect } from 'react';
import './Login.css';
import LoginInputField from '../../components/LoginInputField/LoginInputField';
import { useNavigate } from 'react-router-dom';
import useValidator from '../../hooks/validator.hook';
import { useLoginMutation } from '../../services/auth/api';
import Button from '../../components/button';
import Dialog from '../../components/Dialog/Dialog';
import { setToken } from '../../utils/token';
import useForm from '../../hooks/form.hook';
import { initialLoginData } from './consts';
import { LoginDataType, LoginErrorsType } from './types';
import { loginValidators } from './validators';
import { useUI } from '../../contexts/UIContexts';
import { TOAST_TIMOUT, TOAST_TYPE } from '../../components/toast/consts';

const Login: FC = () => {
  const [login, loginResponse] = useLoginMutation();

  const [loginData, setLoginData] = useForm<LoginDataType>(initialLoginData);
  const [loginValidate, loginErrors] = useValidator<LoginErrorsType, LoginDataType>(
    loginValidators,
    loginData,
    loginResponse.error ? loginResponse.error['data'].errors : {}
  );

  const [showErrorDialog, setShowErrorDialog] = useState({ show: false });

  const navigate = useNavigate();

  const { createToast } = useUI();

  function handleLogin() {
    if (loginValidate()) login(loginData);
  }

  useEffect(() => {
    if (loginResponse.isSuccess) {
      setToken(loginResponse.data.data.token);
      navigate('/employees');
      createToast(TOAST_TYPE.SUCCESS, 'Login success', '', TOAST_TIMOUT.SHORT);
    } else if (loginResponse.isError) {
      setShowErrorDialog({ show: true });
    }
  }, [loginResponse]);

  return (
    <>
      <Dialog
        state={showErrorDialog}
        setState={setShowErrorDialog}
        title='Authentication Error'
        successLabel='Ok'
        onSuccess={() => {
          setShowErrorDialog({ show: false });
        }}
      >
        <p>Invalied username and password!</p>
      </Dialog>
      <div className='full-screen'>
        <div className='flex-row'>
          <div className='column center login-image-column'>
            <div className='circle'>
              <img src='/assets/img/banner.png' alt='Login banner image' />
            </div>
          </div>
          <div className='column center'>
            <div className='login-form'>
              <img src='/assets/img/kv-logo.png' alt='KeyValue Logo' />
              <LoginInputField
                id='usernameInputField'
                label='username'
                type='text'
                value={loginData.username}
                onChange={(value) => setLoginData('username', value)}
                errors={loginErrors.username}
              />
              <LoginInputField
                id='passwordInputField'
                label='Password'
                type='password'
                value={loginData.password}
                onChange={(value) => setLoginData('password', value)}
                errors={loginErrors.password}
              />
              <Button
                className='btn-primary'
                text='Login'
                onClick={handleLogin}
                loading={loginResponse.isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
