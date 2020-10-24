import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from './axiosWithAuth'
import {  Link  } from 'react-router-dom';

// import styled from 'styled-components'

//import InactiveButton from '../Assets/SignUpInactiveButton'
// import WelcomeLogIn from '../Components/WelcomeLogIn.js';
import * as yup from "yup";


// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


// phone_number: Yup.string()
//   .required("required")
//   .matches(phoneRegExp, 'Phone number is not valid')
//   .min(10, "to short")
//   .max(10, "to long"),

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phoneNumber:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  terms: yup.boolean().oneOf([true], "Please agree to terms of use")

});



const SignUp = (props) => {

const [ButtonDisabled,setButtonDisabled] = useState();

const [credentials, setCredentials] = useState({
  username: '',
  password: '',
  email:'',
  phoneNumber:''
})



const [errorState, setErrorState] = useState({
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  terms: ""
});


const [usr,setUsr ] = useState({
  username:"",
  email: "",
  phoneNumber: ""
});


// yup.addMethod(yup.string, "phone", function(messageError = 'Phone number is not valid') {
//   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//   return this.test('phone', messageError, value => {
//     if (value && value.length > 0) {
//       return phoneRegExp.test(value)
//     }
//     return true
//   })
// })
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
      })
      setUsr({
          ...usr,
          [e.target.name]: e.target.value
        })
    
    }

  const signUp = e => {
    e.preventDefault()
    console.log(credentials)
    axiosWithAuth()
      .post('https://watertheplants.herokuapp.com/api/auth/register', usr)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        // props.history.push('/home')
        console.log(res);
        console.log(res.data)
      })
      .catch(err => console.log(err))}

  return (
    <>
    
      {/* <Logo src={LogoImg} /> */}
      
    
 
        <div className="App Form">
          <h1>Water My Plants</h1>
          <h2 className="pale">Welcome!</h2>
          <p className="pale">Register your account below</p>
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
              <label htmlFor="phoneNumber">
                PHONE-NUMBER
                {errorState.phoneNumber.length >= 11 ? (
          <p className="error App-logo">{errorState.phoneNumber}</p>
        ) : null}
              </label>
              <input
                type='text'
                name='phoneNumber'
                placeholder='PHONE NUMBER'
                value={formSchema.phoneNumber}
                onChange={handleChange}
              />
              <label htmlFor="registerbtn">
                REGISTER
              </label>
              <button name="registerbtn" disabled={ButtonDisabled}onClick={signUp}>Register</button>
            </form>
                  
          <Link to='/login'>Already have an account? - Sign In</Link>
       
        </div>

    </>
  );
};

export default SignUp;
