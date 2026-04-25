import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

class TodoDataService {
  getAll(token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return axios.get("https://todoapp-backend-z4uo.onrender.com/api/todos/");
  }

  createTodo(data, token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return axios.post(
      "https://todoapp-backend-z4uo.onrender.com/api/todos/",
      data,
    );
  }

  updateTodo(id, data, token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return axios.put(
      `https://todoapp-backend-z4uo.onrender.com/api/todos/${id}`,
      data,
    );
  }

  deleteTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return axios.delete(
      `https://todoapp-backend-z4uo.onrender.com/api/todos/${id}`,
    );
  }

  completeTodo(id, token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return axios.put(
      `https://todoapp-backend-z4uo.onrender.com/api/todos/${id}/complete`,
    );
  }

  login(data) {
    return axios.post(
      "https://todoapp-backend-z4uo.onrender.com/api/login/",
      data,
    );
  }

  signup(data) {
    return axios.post(
      "https://todoapp-backend-z4uo.onrender.com/api/signup/",
      data,
    );
  }
}

const todoService = new TodoDataService();
export default todoService;
