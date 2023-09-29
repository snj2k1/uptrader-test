import React from "react";
import { Input } from "antd";
import styles from "./SearchPanel.module.css";
const { Search } = Input;

const SearchPanel = ({ setFilter }) => {
  const onSearch = (value) => setFilter(value);
  return (
    <Search
      placeholder="Поиск задачи"
      onSearch={onSearch}
      onChange={(e) => setFilter(e.target.value)}
      className={styles.search}
      style={{
        marginTop: "15px",
        border: "1px solid rgb(10, 161, 226)",
        borderRadius: "5px",
      }}
    />
  );
};

export { SearchPanel };
