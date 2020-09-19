import React, { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import {firebase }from '../firebase/firebase-config'
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = ()=>{

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async(user)=>{
      if(user?.uid){
        dispatch( login( user.uid,user.displayName ) );
        setIsLoggedIn(true);
        dispatch( startLoadingNotes(user.uid) );

      }else{
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
    
  }, [dispatch,setChecking])

  if( checking ){
    return (
      <h1>Wait....</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
            <PublicRoute isAuth={isLoggedIn} component={AuthRouter} path="/auth"/>
            <PrivateRoute exact path="/" isAuth={isLoggedIn} component={JournalScreen} />
        </Switch>
      </div>
    </Router>
  );
}
