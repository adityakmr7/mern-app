
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import MainAppBar from './component/MainAppBar';

function App() {
  return (
   <Router>
      <MainAppBar/>
     <Switch>
       <Route exact path="/" component={Dashboard}/>
       <Route exact path={'/login'} component={Login}/>
       <Route exact path={'/register'} component={Register}/>
     </Switch>
   </Router>
  );
}

export default App;
