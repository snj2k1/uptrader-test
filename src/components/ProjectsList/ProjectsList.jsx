import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeProject } from "../../redux/projects/projects-actions";
import { AddProject } from "../AddProject/AddProject";
import { selectProjects } from "../../redux/projects/projects-selectors";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const handleDelete = (id) => {
    dispatch(removeProject(id));
  };
  return (
    <ul className={styles.list}>
      {Object.keys(projects).map((id) => (
        <li key={id} className={styles.item}>
          <Link to={`/${id}`}>{projects[id]["name"]}</Link>
          <CloseOutlined
            style={{ color: "red" }}
            onClick={() => handleDelete(id)}
          />
        </li>
      ))}
      <AddProject projects={projects} />
    </ul>
  );
};

export { ProjectsList };
