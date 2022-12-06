import DragDrop from "./Components/DragDrop";
import "./App.css";
import { useHorizontalScroll } from "./Components/useHorizontal";
import Create from "./Components/Crud/Create";
import Edit from "./Components/Crud/Edit";
import Home from "./Components/Crud/Home";

function App() {
  const scrollRef = useHorizontalScroll();
  return (
    <div >
      <Home />
    </div>
  );
}

export default App;
