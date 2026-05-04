import { Route, Routes } from "react-router";
import App from "./App";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
    </Routes>
  );
};

export default AppRouter;
