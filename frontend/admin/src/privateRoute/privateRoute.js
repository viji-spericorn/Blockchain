import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const Role = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : '';
  if (!Role) {
    return <Navigate to="/" />;
  }

  return children;
};
export default PrivateRoute;
