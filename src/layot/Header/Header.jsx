import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <span className={styles.logo}>
        <span style={{ color: "rgb(10, 161, 226)" }}>UP</span>
        TODO
      </span>
    </header>
  );
};

export { Header };
