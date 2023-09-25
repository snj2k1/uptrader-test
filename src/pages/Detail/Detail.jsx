import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useSelector } from "react-redux";
import { selectProject } from "../../redux/projects/projects-selectors";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { AddNewTask } from "../../components/AddNewTask/AddNewTask";

const Detail = () => {
  const { id } = useParams();
  const project = useSelector((state) => selectProject(state, id));

  return (
    project && (
      <section>
        <h2>
          Доска задач проекта "
          <span style={{ color: "rgb(10, 161, 226)" }}>{project.name}</span>"
        </h2>
        <AddNewTask id={id} taskId={project.tasks.length} />
        <TaskBoard tasks={project.tasks} />
      </section>
    )
  );
};

export { Detail };
