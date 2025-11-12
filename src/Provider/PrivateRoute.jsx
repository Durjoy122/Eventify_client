import React,{use} from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../layouts/Components/loading';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const Location = useLocation();
    if(loading) {
        return <Loading></Loading>
    }
    if(user && user?.email) {
        return children;
    }
    else {
        return <Navigate to="/auth/login" state={{ from: Location.pathname }} />
    }
};

export default PrivateRoute;