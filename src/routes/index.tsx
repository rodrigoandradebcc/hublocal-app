import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Companies } from '../pages/Companies';
import { Company } from '../pages/Company';
import { LoginPage } from '../pages/LoginPage';
import { SignUp } from '../pages/SignUp';

import { AuthContext } from '../contexts/auth';
import { ProtectRouter } from './ProtectRouter';

const Router = () => {
  const { user } = useContext(AuthContext);

  return(
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/companies" element={
        <ProtectRouter user={user!}>
          <Companies />
        </ProtectRouter>
      }/>
      <Route path="/companies/:companyName" element={
        <ProtectRouter user={user!}>
          <Company />
        </ProtectRouter>
      }/>
    </Routes>
  );
}
export default Router;

