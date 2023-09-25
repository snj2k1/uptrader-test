import "./Projects.module.css";
import { ProjectsList } from "../../components/ProjectsList/ProjectsList";

const Projects = () => {
  return (
    <section>
      <h2>Выберите или создайте новый проект</h2>
      <ProjectsList />
    </section>
  );
};

export { Projects };
