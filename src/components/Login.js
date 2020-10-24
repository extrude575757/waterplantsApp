import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StoreContext } from '../contextAPI/Context.js';

// import { matchPath } from "react-router";




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
  // const match = matchPath(`/auth/register/${form.username}`, {
  //   path: "/auth/register/:username",
  //   exact: false,
  //   strict: true
  // });
  
  
  
    history.push(`/auth/register/${form.username}`);
    // history.replace();
}
/*
Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
input
form
div
Login@http://localhost:3000/static/js/main.chunk.js:730:86
Route@http://localhost:3000/static/js/1.chunk.js:45048:29
Switch@http://localhost:3000/static/js/1.chunk.js:45250:29
div
Router@http://localhost:3000/static/js/1.chunk.js:44683:30
BrowserRouter@http://localhost:3000/static/js/1.chunk.js:44303:35
App
Had to take out the values for the inputs because of this
was 
              value={form.username}
*/
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