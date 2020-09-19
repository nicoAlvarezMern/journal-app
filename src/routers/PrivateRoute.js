import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => {
    localStorage.setItem('lastPath',rest.location.pathname);
    
    return (
        <Route {...rest}
               component={ (props) =>(
                   (isAuth) 
                   ? <Component {...props} />
                   : ( <Redirect to='/auth/login' /> )
               )
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}