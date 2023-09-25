import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./layot/Header/Header";
import { Main } from "./layot/Main/Main";
import { Footer } from "./layot/Footer/Footer";
import { Projects } from "./pages/Projects/Projects";
import { Detail } from "./pages/Detail/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Projects />} />
            <Route path="/:id" element={<Detail />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
