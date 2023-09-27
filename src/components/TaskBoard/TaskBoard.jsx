import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./TaskBoard.module.css";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../redux/projects/projects-actions";
import { EditOutlined } from "@ant-design/icons";
import { EditTask } from "../EditTask/EditTask";
import { useSelector } from "react-redux";
import { selectEdit } from "../../redux/edit/edit-selectors";
import { toggleEdit } from "../../redux/edit/edit-actions";

const TaskBoard = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const isEditing = useSelector(selectEdit);
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleEdit = (task) => {
    setEdit(task);
    dispatch(toggleEdit());
  };

  const getColumnTasks = (status) =>
    taskList.filter((task) => task.status === status);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const [taskId, projectId] = result.draggableId.split(":");
    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    dispatch(
      updateTaskStatus(projectId, taskId, sourceStatus, destinationStatus)
    );

    const newTaskList = [...taskList];
    const movedTask = newTaskList.find((task) => task.id === taskId);

    if (!movedTask) return;

    movedTask.status = destinationStatus;

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
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <h2>{status}</h2>
                {getColumnTasks(status).map((task, index) => {
                  return (
                    <>
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString() + ":" + task.projectId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={styles.task}
                              onClick={() => handleEdit(task)}
                            >
                              <ul className={styles.list}>
                                <li
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <h3>{task.number + ". " + task.title}</h3>
                                  <EditOutlined
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEdit(task);
                                    }}
                                  />
                                </li>
                                <li>
                                  <p>{task.description}</p>
                                </li>
                                <li>
                                  <span>
                                    Дата создания задачи:{" "}
                                    {new Date(task.createDate).toLocaleString(
                                      "ru",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    Дедлайн задачи:{" "}
                                    {new Date(task.deadlineDate).toLocaleString(
                                      "ru",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span>Приоритет: {task.priority}</span>
                                </li>
                              </ul>
                              {/* Добавьте другие свойства задачи */}
                            </div>
                          </div>
                        )}
                      </Draggable>
                      {isEditing && <EditTask task={edit} />}
                    </>
                  );
                })}
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
