import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./TaskBoard.module.css";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../redux/projects/projects-actions";
import { EditOutlined, DashboardOutlined } from "@ant-design/icons";
import { EditTask } from "../EditTask/EditTask";
import { useSelector } from "react-redux";
import { selectEdit } from "../../redux/edit/edit-selectors";
import { toggleEdit } from "../../redux/edit/edit-actions";
/*import moment from "moment";
import "moment-duration-format";*/

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

  /*const timeInWork = (date) => {
    const temp = moment.duration(moment().diff(moment(date)));
    const days = temp.days();
    const hours = temp.hours();
    const minutes = temp.minutes();

    let result = "";

    if (days > 0) {
      result += `${days} дней `;
    }

    if (hours > 0) {
      result += `${hours} часов `;
    }

    if (minutes > 0) {
      result += `${minutes} минут`;
    }

    return result;
  };*/

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
      <div
        className={styles.container}
        style={{ display: "flex", maxWidth: "100%" }}
      >
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
                  minWidth: "350px",
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
                                <li>
                                  <span>
                                    Время в работе:{" "}
                                    {/*timeInWork(task.createDate)*/}
                                  </span>
                                </li>
                                {task.subtasks.length > 0 && (
                                  <li>
                                    <DashboardOutlined />
                                    &nbsp;
                                    {task.subtasks.reduce(
                                      (acc, prev) =>
                                        prev.completed ? acc + 1 : acc,
                                      0
                                    ) +
                                      "/" +
                                      task.subtasks.length}
                                  </li>
                                )}
                              </ul>
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
