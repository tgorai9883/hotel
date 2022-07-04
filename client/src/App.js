import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen.';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomeScreen} exact/>
          <Route path="/book/:roomid/:fromDate/:toDate" component={BookingScreen} exact/>
          <Route path="/register" component={RegisterScreen} exact/>
          <Route path="/login" component={LoginScreen} exact/>
          <Route path="/profile" component={ProfileScreen} exact/>
          <Route path="/admin" component={AdminScreen} exact/>
          <Route path="/" component={LandingScreen} exact/>
        </Switch>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
