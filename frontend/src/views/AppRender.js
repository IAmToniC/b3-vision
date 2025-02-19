import React, {useState} from 'react';
import App from './App';
import AuthForm from './AuthForm';

const AppRender = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      {isLoggedIn ? <App /> : <AuthForm onLogin={() => setIsLoggedIn(true)} />}
    </React.StrictMode>
  );
};

export default AppRender;