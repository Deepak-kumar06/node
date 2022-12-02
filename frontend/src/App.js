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
      {/* <h2 className="header">DRAG & DROP DEMO</h2>
      <DragDrop /> */}
      {/* <div style={{ minHeight: 3000, textAlign: "center" }}>
      <div
      ref={scrollRef}
        style={{
            maxWidth: 300,
            maxHeight:300,
            backgroundColor: "#d3d3d3",
            marginInline: "auto",
            marginTop: 100,
            overflowY: "auto",
            whiteSpace: "nowrap",
            // transform:"rotate(-90deg)"
        }}
      >
        <div
        >
          <h1>This will scroll horizontally</h1>
        </div>
      </div>
    </div> */}
      <Home />
      {/* <Create />
      <Edit/> */}
    </div>
  );
}

export default App;
