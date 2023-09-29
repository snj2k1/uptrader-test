import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProject } from "../../redux/projects/projects-selectors";
import { TaskBoard } from "../../components/TaskBoard/TaskBoard";
import { AddNewTask } from "../../components/AddNewTask/AddNewTask";
import { SearchPanel } from "../../components/SearchPanel/SearchPanel";
import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";

const Detail = () => {
  const { id } = useParams();
  const project = useSelector((state) => selectProject(state, id));
  const [tasks, setTasks] = useState(project.tasks);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!filter) setTasks(project.tasks);
    else {
      if (isNaN(Number(filter)))
        setTasks(
          project.tasks.filter(
            (el) =>
              el.title.slice(0, filter.length).toLowerCase() ===
              filter.toLowerCase()
          )
        );
      else setTasks(project.tasks.filter((el) => el.number === Number(filter)));
    }
  }, [filter, project.tasks]);

  return (
    project && (
      <section>
        <div>
          <Link
            to="/"
            style={{
              fontSize: "24px",
              color: "rgb(10, 161, 226)",
              marginRight: "15px",
            }}
          >
            <LeftOutlined />
          </Link>
          <h2 style={{ display: "inline-block" }}>
            Доска задач проекта "
            <span style={{ color: "rgb(10, 161, 226)" }}>{project.name}</span>"
          </h2>
        </div>
        <AddNewTask id={id} taskId={project.tasks.length} />
        <SearchPanel setFilter={setFilter} />
        <TaskBoard tasks={tasks} />
      </section>
    )
  );
};

export { Detail };
