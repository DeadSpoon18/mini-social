import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./Screens/LoginScreen";
import { Container } from "react-bootstrap";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import UploadScreen from "./Screens/UploadScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PostEditScreen from "./Screens/PostEditScreen";

function App() {
  return (
    <>
      <Router>
        <Header /> 

        <main className="py-3">
          <Container>
            <Route path="/" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/home" component={HomeScreen} />
            <Route path="/upload" component={UploadScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/update/:id" component={PostEditScreen} />
          </Container>
        </main>
      </Router>
    </>
  );
}

export default App;
