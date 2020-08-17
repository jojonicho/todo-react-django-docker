import React from "react";
import useSWR from "swr";
import { Input, SubTitle } from "../ui-kit";
import { BulletList as Loader } from "react-content-loader";
import styled from "@emotion/styled";
import { TodoType as Todo } from "../utils/types";
import { TodoList } from "../components/TodoList";
import { useForm } from "react-hook-form";

export const HomeContainer = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.heading};
  padding: 10px 2vw;
  margin: 0.25vw 0 0.75vw 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  svg {
    width: 40vw;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 1rem;
    input {
      width: 75vw;
    }
  }
  border-radius: ${({ theme }) => theme.borderRadius.default};
  // box-shadow: ${({ theme }) => theme.shadow.mekari};
  text {
    margin-top: calc(0.3rem + 0.2vw);
  }
  .submit {
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.white.base};
    }
    font-weight: bold;
  }
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
  div {
    margin: 0 5px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
export const Home: React.FC = () => {
  const URL = "http://localhost:8000";
  const { handleSubmit, register, reset, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const fetcher = async (endpoint: string) => {
    const response = await fetch(`${URL}/${endpoint}/`);
    const json = await response.json();
    return json;
  };
  const { data, mutate } = useSWR<[Todo]>("todos", fetcher);
  const addTodo = async (name: string) => {
    await fetch(`${URL}/todos/`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
      body: JSON.stringify({ name }),
    });
    mutate({ ...data! });
  };
  const deleteTodo = async (id: number) => {
    await fetch(`${URL}/todos/${id}/`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "DELETE",
    });
    mutate({ ...data! });
  };
  const updateTodo = async (id: number, name: string, completed: boolean) => {
    await fetch(`${URL}/todos/${id}/`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "PATCH",
      body: JSON.stringify({ name, completed }),
    });
    mutate({ ...data! });
  };
  const onSubmit = (values: any) => {
    addTodo(values.todo);
    reset();
  };
  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="wear a mask"
          autoComplete="off"
          name="todo"
          ref={register({
            required: "You cannot put nothing as your todo",
          })}
        />
        <SubTitle>{errors.todo && errors.todo.message}</SubTitle>
      </Form>
      {!data ? (
        <Loader />
      ) : data ? (
        <>
          <TodoList
            todos={data!}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </>
      ) : null}
    </HomeContainer>
  );
};
