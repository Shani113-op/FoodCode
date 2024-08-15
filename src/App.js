import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './mainpage/Home';
import Login from './mainpage/Login';
import Signup from './mainpage/Signup';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/creatuser" element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>

  );
}

export default App;
