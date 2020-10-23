import React from 'react';


import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import PrivateRoute from './Auth/PrivateRoute';

import SignUp from './Auth/SignUp';
import Login from './components/Login'
import Heading from './Heading';

function App() {
  return (
    <Router>
      <Heading />
      {/* <StyledApp> */}
      <div className="App">

        <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={Login} />
        {/* <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/NewEntry" component={NewEntryPage} />
        <PrivateRoute path="/MyEntries" component={EntryArchive} />
        <PrivateRoute path="/edit/:id" component={Edit} />  */}
        </Switch>


      </div>

      {/* </StyledApp> */}
    </Router>
  );
}


export default App;


