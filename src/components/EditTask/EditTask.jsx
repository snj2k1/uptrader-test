import { Modal, DatePicker, Form, Input, Select, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { toggleEdit } from "../../redux/edit/edit-actions";
import { changeTask } from "../../redux/projects/projects-actions";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(task.deadlineDate);
  const [files, setFiles] = useState(task.attachments);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { TextArea } = Input;

  const handleAdd = (title, description, priority, deadline, files) => {
    // Обновление задачи с новыми данными
    const updatedTask = {
      ...task, // Копируем существующую задачу
      title,
      description,
      priority,
      deadlineDate: deadline,
      attachments: files,
      // Добавьте обновление подзадач и комментариев здесь, если необходимо
    };

    dispatch(changeTask(task.projectId, updatedTask)); // Отправляем обновленную задачу в Redux
  };

  const handleOk = () => {
    if (title.trim()) {
      handleAdd(title, description, priority, deadline, files);
      setTitle("");
      setDescription("");
      setPriority("Низкий");
      setDeadline(new Date());
      setFiles([]);
      setError(false);
      setIsModalOpen(false);
      dispatch(toggleEdit());
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    dispatch(toggleEdit());
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
    <Modal
      title="Редактировать задачу"
      visible={isModalOpen}
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
          <DatePicker onChange={(e) => setDeadline(new Date(e))} />
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
            value={files}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { EditTask };
