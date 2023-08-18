import React, { useState, FC, useEffect } from 'react';
import './Login.css';
import LoginInputField from '../../components/LoginInputField/LoginInputField';
import { useNavigate } from 'react-router-dom';
import useValidator from '../../hooks/validator.hook';
import { useLoginMutation } from './api';
import { includeBackendValidators, requiredValidator } from '../../utils/validators.utils';
import Button from '../../components/button';
import Dialog from '../../components/Dialog/Dialog';
import { setToken } from '../../utils/token';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState({ show: false });

  const navigate = useNavigate();
  const [login, loginResponse] = useLoginMutation();

  function handleLogin() {
    if (email && password)
      login({
        email,
        password
      });
  }

  const emailErrors = useValidator(
    [
      requiredValidator('Email is required'),
      includeBackendValidators((states) => states[1].error.data.errors.email)
    ],
    [email, loginResponse]
  );

  const passwordErrors = useValidator(
    [
      requiredValidator('Password is required'),
      includeBackendValidators((states) => states[1].error.data.errors.password)
    ],
    [password, loginResponse]
  );

  useEffect(() => {
    if (loginResponse.isSuccess) {
      setToken(loginResponse.data.data.token);
      navigate('/employees');
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
                id='emailInputField'
                label='Email'
                type='text'
                value={email}
                onChange={setEmail}
                errors={emailErrors}
              />
              <LoginInputField
                id='passwordInputField'
                label='Password'
                type='password'
                value={password}
                onChange={setPassword}
                errors={passwordErrors}
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
