
import './App.css';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Login from './Login.';
import Register from './Register';
import Reset from './Reset';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          
      <Route exact path="/" name="contact Page" element={<Login />} />
          
      <Route exact path="/register" name="contact Page" element={<Register />} />
          
              
      <Route exact path="/reset" name="contact Page" element={<Reset />} />
          
              
      <Route exact path="/dashboard" name="contact Page" element={<Dashboard />} />
          
          

          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
