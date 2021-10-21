import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import NavbarMenu from "./components/NavbarMenu";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <NavbarMenu />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/forgotpassword" component={ForgetPassword} />
        <Route
          path="/resetpassword/:resetToken"
          component={ResetPasswordScreen}
        />
        <Route path="/" exact component={HomeScreen} />
      </Router>
    </>
  );
};

export default App;
