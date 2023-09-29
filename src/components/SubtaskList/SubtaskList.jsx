import React, { useState } from "react";
import { Button, Input, Checkbox } from "antd";
import styles from "./SubtaskList.module.css";

const SubtaskList = ({ subtasks, onAddSubtask, onUpdateSubtask }) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      onAddSubtask({ title: subtaskTitle, completed: false });
      setSubtaskTitle("");
    }
  };

  const handleToggleSubtask = (subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].completed =
      !updatedSubtasks[subtaskIndex].completed;
    onUpdateSubtask(updatedSubtasks);
  };

  return (
    <div>
      <ul className={styles.list}>
        {subtasks.map((subtask, index) => (
          <li key={index}>
            <Checkbox
              checked={subtask.completed}
              onChange={() => handleToggleSubtask(index)}
            />
            {subtask.title +
              " | " +
              (subtask.completed ? "Выполнена" : "Не выполнена")}
          </li>
        ))}
      </ul>
      <Input
        placeholder="Введите название подзадачи..."
        value={subtaskTitle}
        className={styles.subtask}
        onChange={(e) => setSubtaskTitle(e.target.value)}
      />
      <Button
        type="primary"
        onClick={handleAddSubtask}
        style={{ marginTop: "10px" }}
      >
        Добавить подзадачу
      </Button>
    </div>
  );
};

export { SubtaskList };
