import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Page/RegisterPage/RegisterPage";
import LoginPage from "./Page/LoginPage/LoginPage";
import "./App.css";
import DashBoard from "./Page/DashBoard/DashBoard";
import ShareTaskPage from "./Page/ShareTaskPage/ShareTaskPage";
import DashnavigateState from "./context/NavigateDashboard/DashnavigateState";
import BoardFilterState from "./context/BoardFilter/BoardFilterState";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CreateTaskState from "./context/CreateTask/CreateTaskState";
import EditTaskState from "./context/EditTask/EditTaskState";
import DeleteTaskState from "./context/DeleteTask/DeleteTaskState";

function App() {
  return (
    <>
      <DashnavigateState>
        <BoardFilterState>
          <CreateTaskState>
            <EditTaskState>
              <DeleteTaskState>
                <Routes>
                  <Route path="/" element={<ProtectedRoute Components={DashBoard} />} />
                  <Route path="/share/task/:id" Component={ShareTaskPage} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </DeleteTaskState>
            </EditTaskState>
          </CreateTaskState>
        </BoardFilterState>
      </DashnavigateState>
    </>
  );
}

export default App;
