import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { StoreContext } from '../contextAPI/Context.js';

import { matchPath } from "react-router";




import { axiosWithAuth } from '../Auth/axiosWithAuth.js';
// import Styled from 'styled-components';
// const Divv = Styled.div`
//   background-color:blue;
// `;
export default function Login(props) {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(StoreContext);
  const [form, setForm] = useState({
    username: userInfo?.username,
    password: userInfo?.password
  });

  const handleChanges = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('https://watertheplants.herokuapp.com/api/auth/register', form)
      .then(res => {
        console.log(res.data);
        setUserInfo(res.data);
//setTimeout(() => props.history.push('/Home'), 1000);
      })
      .catch(err => {
        if (err.response) {
          console.error('Error logging in: ', err.response.data);
        } else {
          console.error('Error logging in: ', err);
        }
      });
  };
const PlantsList = () =>{
  // const match = matchPath(`/auth/register/${form.username}`, {
  //   path: "/auth/register/:username",
  //   exact: false,
  //   strict: true
  // });
  
  
  
    history.push(`/auth/register/${form.username}`);
    // history.replace();
}
  return (
  
        <div className="App">
          <h1>Welcome back!</h1>
          <form className="App" onSubmit={onSubmit}>
            <label htmlFor="username">
              USER NAME
            </label>
            <input
              
              type="username"
              name="username"
              placeholder="USERNAME"
              value={form.username}
              onChange={handleChanges}
            />
            <label htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={form.password}
              onChange={handleChanges}
            />
            <label htmlFor="login">
              LOGIN
            </label>
             <button onClick={PlantsList}>Login</button>
            
          </form>
          <button>
            DON'T HAVE AN ACCOUNT?<NavLink to="/">SIGN UP</NavLink>
          </button>
        </div>
      
  
  );
}