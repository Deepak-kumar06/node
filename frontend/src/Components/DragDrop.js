import React, { useState, useRef } from "react";

const DragDrop = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    { name: "Item 1", bgcolor: "yellow" },
    { name: "Item 2", bgcolor: "blue" },
    { name: "Item 3", bgcolor: "green" },
    { name: "Item 4", bgcolor: "yellow" },
    { name: "Item 5", bgcolor: "green" },
    { name: "Item 6", bgcolor: "yellow" },
  ]);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  return (
    <>
      {list &&
        list.map((item, index) => (
          <div
            style={{
              backgroundColor: item.bgcolor,
              margin: "20px 30%",
              cursor: "pointer",
              padding:"20px"
            }}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable
          >
            {item.name}
          </div>
        ))}
    </>
  );
};
export default DragDrop;
