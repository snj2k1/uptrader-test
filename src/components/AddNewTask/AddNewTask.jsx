import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Button, Modal, DatePicker, Form, Input, Select, Upload } from "antd";
import styles from "./AddNewTask.module.css";
import { addTask } from "../../redux/projects/projects-actions";
import { selectTaskId } from "../../redux/projects/projects-selectors";
import { useSelector } from "react-redux";
import moment from "moment";

const AddNewTask = ({ id }) => {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => selectTaskId(state, id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Низкий");
  const [deadline, setDeadline] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const { TextArea } = Input;

  const handleAdd = (title, description, priority, deadline, files) => {
    const newTask = {
      projectId: id,
      id: taskId,
      number: Number(taskId) + 1,
      title,
      description,
      createDate: new Date(),
      deadlineDate: deadline,
      priority,
      status: "Queue",
      subtasks: [],
      comments: [],
      attachments: files,
    };
    dispatch(addTask(id, newTask));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (title.trim()) {
      handleAdd(title, description, priority, deadline, files);
      setTitle("");
      setDescription("");
      setPriority("Низкий");
      setDeadline(null);
      setFiles([]);
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        icon={<PlusOutlined />}
        className={styles.button}
      >
        Добавить новую задачу
      </Button>
      <Modal
        title="Добавить новую задачу"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Название">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Описание">
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Приоритет">
            <Select value={priority} onChange={(e) => setPriority(e)}>
              <Select.Option value="Низкий">Низкий</Select.Option>
              <Select.Option value="Средний">Средний</Select.Option>
              <Select.Option value="Высокий">Высокий</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Дедлайн">
            <DatePicker
              placeholder={moment(new Date()).format("YYYY-MM-DD")}
              onChange={(e) => setDeadline(new Date(e))}
            />
          </Form.Item>
          <Form.Item
            label="Файлы"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              onChange={(e) => setFiles(e.fileList)}
              fileList={files}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { AddNewTask };
