import "./App.css";
// import { useHorizontalScroll } from "./Components/useHorizontal";

import { Route, Routes } from "react-router-dom";
//CSS
import 'bootstrap/dist/css/bootstrap.css'

//Components
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "../src/reducer/useReducer"
import AdminRouter from "./Admin/Index";

export const UserContext = createContext();


function App() {
  // const scrollRef = useHorizontalScroll();
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }} >
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path={`/admin/*`} element={<AdminRouter />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
