import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

const initialState = {
    name: "",
    email: "",
    password: "",
    confirm: ""
}


export const RegisterScreen = () => {
    
    const [ formValues, handleInputChange ] = useForm(initialState);
    const {name,email,password,confirm} = formValues;
    const dispatch = useDispatch();
    const { msgError,loading } = useSelector( state => state.ui );

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegister(email,password,name));
        }
    }
    const isFormValid = ()=>{
        if(name.trim().length === 0){
            dispatch( setError("Name is required") );
            console.log("Name is required");
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch( setError("Email is not valid") );
            console.log("Email is not valid");
            return false;
        }else if( password !== confirm || password.length < 5){
            dispatch( setError("Password should be at least 6 characters and match each other") );
            console.log("Password should be at least 6 characters and match each other");
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>
            <form onSubmit={handleSubmit} className="animate__animated animate__fadeIn animate__faster">
                {
                    msgError &&
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}             
                />
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email} 
                    onChange={handleInputChange}                 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"
                    autoComplete="off"
                    value={confirm} 
                    onChange={handleInputChange} 
                />
                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block mb-5"
                    disabled={loading}
                >
                    Register
                </button>
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
