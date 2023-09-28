import { Modal, DatePicker, Form, Input, Select, Upload, Button } from "antd";
import { useState } from "react";

const SubtaskList = ({ subtasks, onAddSubtask }) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const handleAddSubtask = () => {
    if (subtaskTitle.trim()) {
      onAddSubtask({ title: subtaskTitle, completed: false });
      setSubtaskTitle("");
    }
  };

  return (
    <div>
      <ul>
        {subtasks.map((subtask, index) => (
          <li key={index}>
            {subtask.title} - {subtask.completed ? "Завершено" : "Не завершено"}
          </li>
        ))}
      </ul>
      <Input
        placeholder="Добавить подзадачу"
        value={subtaskTitle}
        onChange={(e) => setSubtaskTitle(e.target.value)}
      />
      <Button type="primary" onClick={handleAddSubtask}>
        Добавить подзадачу
      </Button>
    </div>
  );
};

export { SubtaskList };
