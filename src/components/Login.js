import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../contextAPI/Context.js';

// import { matchPath } from "react-router";




import { axiosWithAuth } from '../Auth/axiosWithAuth.js';
// import Styled from 'styled-components';
// const Divv = Styled.div`
//   background-color:blue;
// `;
export default function Login(props) {
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
        console.log(res);
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

}

  return (
  
        <div className="App Form">
          <h1>Welcome back!</h1>
          <form className="App" onSubmit={onSubmit}>
            <label htmlFor="username">
              USER NAME
            </label>
            <input
              
              type="username"
              name="username"
              placeholder="USERNAME"
              onChange={handleChanges}
            />
            <label htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              onChange={handleChanges}
            />
            <label htmlFor="login">
              LOGIN
            </label>
             <button onClick={PlantsList}>Login</button>
            
          </form>
          <button>
            DON'T HAVE AN ACCOUNT?<Link to="/">SIGN UP</Link>
          </button>
        </div>
      
  
  );
}