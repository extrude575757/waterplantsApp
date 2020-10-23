
import React, { useState } from 'react';


export const StoreContext = React.createContext({});

export const ContextProvider = props => {
  // Password should be removed when going live, this is just for ease of development
  const [userInfo, setState] = useState({
    id: null,
    username: '',
    password: ''
  });

  const setUserInfo = data => {
    const { token, user } = data;
    const { id, username } = user;
    localStorage.setItem('token', token);
    setState({ id, username });
  };
  
  const context = { userInfo, setUserInfo };


  return (
    <StoreContext.Provider value={context}>
      {props.children}
    </StoreContext.Provider>
  );
};

