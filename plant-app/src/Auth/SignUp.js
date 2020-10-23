import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from './axiosWithAuth'
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import styled from 'styled-components'

//import InactiveButton from '../Assets/SignUpInactiveButton'
// import WelcomeLogIn from '../Components/WelcomeLogIn.js';
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use")

});



const SignUp = (props) => {

const [ButtonDisabled,setButtonDisabled] = useState();

const [credentials, setCredentials] = useState({
  username: '',
  password: '',
  email:''
})



const [errorState, setErrorState] = useState({
  username: "",
  email: "",
  password: "",
  terms: ""
});

const validate = event => {
    let value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    yup
      .reach(formSchema, event.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [event.target.name]: err.errors[0]
        });
      });
  };



  useEffect(() => {
    formSchema.isValid(credentials).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [credentials]);
  
  const handleChange = e => {
    e.persist();
    validate(e);
    setCredentials({
      ...credentials, 
      [e.target.name]: e.target.value
      })}

  const signUp = e => {
    e.preventDefault()
    console.log(credentials)
    axiosWithAuth()
      .post('/auth/register', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        // props.history.push('/home')
        console.log(res.data)
      })
      .catch(err => console.log(err))}

  return (
    <>
    
      {/* <Logo src={LogoImg} /> */}
      Water My Plants
    
 
        <div className="App">
          <h1>Welcome!</h1>
          <p>Register your account below</p>
              <form className="App" onSubmit={signUp}>
                <label htmlFor="username">
                  USER NAME
                </label>
              <input
                type='text'
                name='username'
                placeholder='NAME'
                value={credentials.username}
                onChange={handleChange}
              />
              <label htmlFor="username">
                  E-MAIL
                  {errorState.email.length > 0 ? (
          <p className="error App-logo">{errorState.email}</p>
        ) : null}
                </label>
              <input
                type='email'
                name='email'
                placeholder='EMAIL'
                value={formSchema.email}
                onChange={handleChange}
              />
              <label htmlFor="password">
                PASSWORD
              </label>
              <input
                type='password'
                name='password'
                placeholder='PASSWORD'
                value={credentials.password}
                onChange={handleChange}
              />
              <label htmlFor="registerbtn">
                REGISTER
              </label>
              <button name="registerbtn" onClick={signUp}>Register</button>
            </form>
                  
          <Link to='/login'>Already have an account? - Sign In</Link>
       
        </div>

    </>
  );
};

export default SignUp;
