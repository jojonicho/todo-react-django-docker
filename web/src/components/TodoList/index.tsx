import React from "react";
import { TodoType } from "../../utils/types";
import { Todo } from "../Todo";

interface TodoListProps {
  todos?: [TodoType];
  updateTodo: any;
  deleteTodo: any;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  return (
    <>
      {todos && todos.length > 0
        ? todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))
        : null}
    </>
  );
};
