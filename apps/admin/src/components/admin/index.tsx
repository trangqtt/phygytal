import JWTDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { accessTokenKey } from '../../constants';
import Layout from '../../layout/Layout';
import { UserRole } from '../../routes';

export const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem(accessTokenKey);

    if (userToken) {
      const decode = JWTDecode(userToken) as any;

      const expireAt = decode.exp;
      if (expireAt < Math.floor(Date.now() / 1000)) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Layout userRole={UserRole.ORG_ADMIN}>
      <Outlet />
    </Layout>
  );
};
