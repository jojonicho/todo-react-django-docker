import React, { useState } from "react";
import { TodoType } from "../../../utils/types";
import { Title, Button, Input, SubTitle, RowContainer } from "../../../ui-kit";
// import { ReactComponent as Check } from "../../../static/check.svg";
// import { ReactComponent as Uncheck } from "../../../static/uncheck.svg";
import styled from "@emotion/styled/";
import { useForm } from "react-hook-form";

interface TodoProps {
  todo: TodoType;
  updateTodo: any;
  deleteTodo: any;
}

const Form = styled.form`
  input {
    width: 40vw;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  backdrop-filter: blur(40px) contrast(0.8);
  box-shadow: ${({ theme }) => theme.shadow.mekari};
  margin-top: 3px;
  padding: 2px;
  border-radius: 2px;
  overflow: hidden;
`;

export const Todo: React.FC<TodoProps> = ({ todo, updateTodo, deleteTodo }) => {
  const [edit, setEdit] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: todo.name,
    },
  });
  const onSubmit = (values: any) => {
    updateTodo(todo.id, values.name, todo.completed);
  };
  return (
    <TodoContainer>
      <Button onClick={() => updateTodo(todo.id, todo.name, !todo.completed)}>
        {todo.completed ? "undo" : "finish"}
      </Button>
      <SubTitle>{todo.completed ? <s>{todo.name}</s> : todo.name}</SubTitle>
      {edit ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="name" autoFocus ref={register} />
          <Button color="RED" onClick={handleSubmit(onSubmit)}>
            Update
          </Button>
        </Form>
      ) : (
        <RowContainer>
          <RowContainer>
            <Button onClick={() => setEdit((v) => !v)}>Edit</Button>
            <Button color="RED" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </RowContainer>
        </RowContainer>
      )}
    </TodoContainer>
  );
};
