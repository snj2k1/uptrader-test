import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Link to="/" className={styles.logo}>
        <span style={{ color: "rgb(10, 161, 226)" }}>UP</span>
        TODO
      </Link>
    </header>
  );
};

export { Header };
