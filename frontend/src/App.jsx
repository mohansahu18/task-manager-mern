import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomePage.jsx";
import TaskScreen from "./pages/TaskPage.jsx";
import LoginScreen from "./components/auth/Login.jsx";
import RegisterScreen from "./components/auth/Register.jsx";
import Header from "./components/navBar/Header.jsx";
function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={token ? <HomeScreen /> : <LoginScreen />} />
          <Route
            path="/task/:id"
            element={token ? <TaskScreen /> : <LoginScreen />}
          />
          <Route
            path="/task/"
            element={token ? <TaskScreen /> : <LoginScreen />}
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
