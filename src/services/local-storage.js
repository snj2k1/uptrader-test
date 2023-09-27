export const loadDataFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem("myAppData");
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Ошибка при чтении данных из localStorage:", error);
    return undefined;
  }
};

export const saveDataToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Ошибка при сохранении данных в localStorage:", error);
  }
};
