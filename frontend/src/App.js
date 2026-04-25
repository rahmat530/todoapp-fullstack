import React, {useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoList from "./components/todos-list";
import AddTodo from "./components/add-todo";
import Login from "./components/login";
import Signup from "./components/signup";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Navbar";

import TodoDataService from "./services/todo";

function App() {
  // const user = null;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  async function login(user = null) {
    TodoDataService.login(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((e) => {
        console.log("login", e);
        setError(e.toString());
      });
  }

  async function logout() {
    setToken("");
    setUser("");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }

  async function signup(user = null) {
    TodoDataService.signup(user)
      .then((response) => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch((e) => {
        console.log("signup", e);
        setError(e.toString());
      });
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>My Todos.</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>
                Todos
              </Link>
              {user ? (
                <Link className="nav-link" onClick={logout}>
                  Logout({user})
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                  <Link className="nav-link" to={"/signup"}>
                    Sign Up
                  </Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodoList token={token} />} />
          <Route path="/todos" element={<TodoList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />} />
          <Route path="/todos/:id" element={<AddTodo token={token} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </div>
      <footer className="text-center text-lg-start" bg-light text-muted mt-4>
        <div className="text-center p-4">
          © Copyright -
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="www.linkedin.com"
          >
            Rahmat Wahdat - 2026
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
