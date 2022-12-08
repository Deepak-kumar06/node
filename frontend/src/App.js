import "./App.css";
import { useHorizontalScroll } from "./Components/useHorizontal";

import { Route, Routes } from "react-router-dom";
//CSS
import 'bootstrap/dist/css/bootstrap.css'

//Components
import Home from "./Components/components/Home";
import About from "./Components/components/About";
import Login from "./Components/components/Login";
import Register from "./Components/components/Register";
import Contact from "./Components/components/Contact";
import Navbar from "./Components/components/Navbar";


function App() {
  const scrollRef = useHorizontalScroll();
  return (
    <div >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
