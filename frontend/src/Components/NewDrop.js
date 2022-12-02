import React, { useState, useRef } from "react";

const NewDrop = () => {
  //   const dragItem = useRef();
  //   const dragOverItem = useRef();
  const [list, setList] = useState([
    { name: "Angular", category: "wip", bgcolor: "yellow" },
    { name: "React", category: "wip", bgcolor: "pink" },
    { name: "Vue", category: "complete", bgcolor: "skyblue" },
  ]);

  const dragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const dragEnter = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = list.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return cat;
    });

    setList({...list, tasks});
    console.log('task',tasks)
  };
console.log(list )

  var tasks = {
    wip: [],
    complete: [],
  };

  list.forEach((t) => {
    tasks[t.category].push(
      <div
        key={t.name}
        onDragStart={(e) => dragStart(e, t.name)}
        draggable
        className="draggable"
        style={{ backgroundColor: t.bgcolor }}
      >
        {t.name}
      </div>
    );
  });
  console.log('arr',tasks)

  return (
    <>
      <h2 className="header">DRAG & DROP</h2>
      <div
        onDragEnter={(e) => dragEnter(e)}
        onDragEnd={(e) => {
          drop(e, "wip");
        }}
      >
        <span className="task-header">WIP</span>
        {tasks.wip}
      </div>
      <div
        onDragEnter={(e) => dragEnter(e)}
        onDragEnd={(e) => drop(e, "complete")}
      >
        <span className="task-header">COMPLETED</span>
        {tasks.complete}
      </div>
    </>
  );
};
export default NewDrop;
