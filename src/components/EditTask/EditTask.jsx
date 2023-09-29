import { Modal, DatePicker, Form, Input, Select, Upload, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { toggleEdit } from "../../redux/edit/edit-actions";
import { changeTask } from "../../redux/projects/projects-actions";
import { SubtaskList } from "../SubtaskList/SubtaskList";
import { CommentList } from "../CommentList/CommentList";
//import moment from "moment";
import styles from "./EditTask.module.css";

const EditTask = ({ task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(task.deadlineDate);
  const [files, setFiles] = useState(task.attachments);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(task.comments || []);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const { TextArea } = Input;

  const handleAdd = (title, description, priority, deadline, files) => {
    const newTask = {
      ...task,
      title,
      description,
      deadlineDate: deadline,
      priority,
      subtasks,
      comments,
      attachments: files,
    };
    dispatch(changeTask(task.projectId, newTask));
  };

  const handleAddChildComment = (parentComment, text) => {
    if (text.trim()) {
      if (!parentComment.children) {
        parentComment.children = [];
      }
      const newChildComment = {
        text,
      };
      parentComment.children.push(newChildComment);
      setComments([...comments]);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = { text: commentText, children: [] };
      comments.push(newComment);
      setCommentText("");
    }
  };

  const handleAddSubtask = (subtask) => {
    setSubtasks([...subtasks, subtask]);
  };

  const handleUpdateSubtask = (updatedSubtasks) => {
    setSubtasks(updatedSubtasks);
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
            placeholder={/*moment(deadline).format("YYYY-MM-DD")*/ ""}
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
        <Form.Item label="Подзадачи">
          <SubtaskList
            subtasks={subtasks}
            onAddSubtask={handleAddSubtask}
            onUpdateSubtask={handleUpdateSubtask}
          />
        </Form.Item>
        <Form.Item label="Комментарий">
          <TextArea
            rows={4}
            placeholder="Добавить комментарий"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ border: "1px solid #1677ff" }}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            style={{ marginTop: "10px" }}
          >
            Добавить комментарий
          </Button>
        </Form.Item>
        <div>
          <h3>Комментарии:</h3>
          <CommentList
            comments={comments}
            handleAddChildComment={handleAddChildComment}
          />
        </div>
      </Form>
    </Modal>
  );
};

export { EditTask };
