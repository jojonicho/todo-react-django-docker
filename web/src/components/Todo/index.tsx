import React, { useState } from "react";
import { TodoType } from "../../utils/types";
import { Container, RowContainer, Title, Button, Input } from "../../ui-kit";
import { ReactComponent as Check } from "../../static/check.svg";
import { ReactComponent as Uncheck } from "../../static/uncheck.svg";
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
    <Container>
      <RowContainer>
        {todo.completed ? (
          <Check
            onClick={() => updateTodo(todo.id, todo.name, !todo.completed)}
          />
        ) : (
          <Uncheck
            onClick={() => updateTodo(todo.id, todo.name, !todo.completed)}
          />
        )}
        {edit ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input name="name" autoFocus ref={register} />
            <Button color="RED" onClick={handleSubmit(onSubmit)}>
              Update
            </Button>
          </Form>
        ) : (
          <>
            <Title>{todo.completed ? <s>{todo.name}</s> : todo.name}</Title>
            <RowContainer>
              <Button onClick={() => setEdit((v) => !v)}>Edit</Button>
              <Button color="RED" onClick={() => deleteTodo(todo.id)}>
                Delete
              </Button>
            </RowContainer>
          </>
        )}
      </RowContainer>
    </Container>
  );
};
