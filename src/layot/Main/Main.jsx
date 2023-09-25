import { Outlet } from "react-router-dom";
import "./Main.module.css";

const Main = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export { Main };
