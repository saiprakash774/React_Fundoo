import './App.css';
import Registration from './Components/Registration/UserRegistration';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPass';
import Reset from './Components/Reset/Reset'
//import Toolbar from './Components/Toolbar/Toolbar'
//import Drawer from './Components/Dashboard/Sidebar'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import dashboard from './Components/Dashboard/dashboard';
import ProtectedRoutes from '../src/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect path="/" to="/login" exact />
          <Route path="/registration" component={Registration} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgotPassword" component={ForgotPassword} exact />
          <Route path="/resetpassword/:token" component={Reset} exact />
          <ProtectedRoutes path='/dashboard' component={dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
