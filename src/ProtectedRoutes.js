import React from 'react';
import { Route, Redirect } from 'react-router-dom';
let authenticated = false;

const isAuthenticated = () => {
    if (localStorage.getItem("userToken") === null) {
        authenticated = false;
    } else {
        authenticated = true;
    }
    return authenticated;
}

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (isAuthenticated()) {
                return <Component{...props} />;
            } else {
                return (<Redirect to={
                    {
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }
                } />
                );
            }
        }}
        />
    );
};

export default ProtectedRoutes;