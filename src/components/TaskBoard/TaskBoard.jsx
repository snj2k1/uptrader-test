import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TaskBoard = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const getColumnTasks = (status) =>
    taskList.filter((task) => task.status === status);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTaskList = [...taskList];
    const movedTask = newTaskList.find(
      (task) => task.id === result.draggableId
    );

    if (!movedTask) return;

    movedTask.status = result.destination.droppableId;

    setTaskList(newTaskList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex" }}>
        {["Queue", "Development", "Done"].map((status) => (
          <Droppable key={status} droppableId={status} direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ flex: 1 }}
              >
                <h2>{status}</h2>
                {getColumnTasks(status).map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task">
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          {/* Добавьте другие свойства задачи */}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export { TaskBoard };
