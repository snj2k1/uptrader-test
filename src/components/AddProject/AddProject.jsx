import { addProject } from "../../redux/projects/projects-actions";
import { getRandomInt } from "../../services/get-random";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import styles from "./AddProject.module.css";

const AddProject = (props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = (name) => {
    let id = getRandomInt();
    while (props.projects.id) {
      id = getRandomInt();
    }
    dispatch(addProject(name, id));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (projectName.trim()) {
      handleAdd(projectName);
      setProjectName("");
      setIsModalOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        icon={<PlusOutlined />}
        className={styles.button}
      >
        Добавить
      </Button>
      <Modal
        title="Добавить новый проект"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>Введите название проекта:</span>
        {error && (
          <span style={{ color: "red", display: "block", fontSize: "12px" }}>
            Поле не может быть пустым!
          </span>
        )}
        <Input
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="New Project"
          value={projectName}
          style={error && { borderColor: "red" }}
        />
      </Modal>
    </>
  );
};

export { AddProject };
