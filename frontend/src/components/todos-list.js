import React, { useState, useEffect } from "react";
import TodoDataService from "../services/todo";
import { Link } from "react-router-dom";

import { Card, Container, Button, Alert } from "react-bootstrap";
import moment from "moment";

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);

  const retrieveTodo = () => {
    TodoDataService.getAll(token)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    retrieveTodo();
  }, [token]);

  const deleteTodo = (todoId) => {
    TodoDataService.deleteTodo(todoId, token)
      .then((response) => {
        retrieveTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const completeTodo = (todoId) => {
    TodoDataService.completeTodo(todoId, token)
      .then((response) => {
        retrieveTodo();
        console.log("completeTodo", todoId);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      {token == null || token === "" ? (
        <Alert>
          You are not logged in. Please <Link to={"/login"}>login</Link> to see
          your todos
        </Alert>
      ) : (
        <div>
          <Link to={"/todos/create"}>
            <Button variant="outline-info" className="mb-3">
              Add To-do
            </Button>
          </Link>
          {todos.map((todo) => {
            return (
              <Card key={todo.id} className="mb-3">
                <Card.Body>
                  <div
                    className={`${todo.completed ? "text-decoration-line-through" : ""}`}
                  >
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>
                      <b>Memo:</b> {todo.memo}
                    </Card.Text>
                    <Card.Text>
                      Data Created:{" "}
                      {moment(todo.created).format("Do MMMM YYYY")}
                    </Card.Text>
                  </div>
                  {!todo.completed && (
                    <Link
                      to={"/todos/" + todo.id}
                      state={{ currentTodo: todo }}
                    >
                      <Button variant="outline-info" className="me-2">
                        Edit
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTodo(todo.id)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={() => completeTodo(todo.id)}
                  >
                    Complete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
};

// function TodoList() {
//   return (<div className="App">Todos List</div>);
// }

export default TodoList;
