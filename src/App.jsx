import "./App.css";
import ForgotPassword from "./components/Forgotpass";
import Navbar from "./components/Navbar";
import Contactpage from "./pages/Contactpage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import { Routes,Route } from "react-router-dom";



function App() {

  const [loggedIn ,setLoggedIn] = useState(false);

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forgot' element={<ForgotPassword/>}></Route>
        <Route path='/contact' element={<Contactpage/>}/>
      </Routes>
    </div>
  );
}

export default App;
