import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_TODOS } from "../graphql/query";
import { TodoAttributes } from "../types";
import styled from "styled-components";

const TodoWrap = styled.div`
  border: 1px solid gray;
  width: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    margin: 0;
  }
`;

const TodoListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Todo = (data: TodoAttributes) => {
  const { title, content } = data;
  return (
    <TodoWrap>
      <h3>title : {title}</h3>
      <span>content : {content}</span>
    </TodoWrap>
  );
};

const TodoList = () => {
  const { data } = useQuery<{ allTodos: TodoAttributes[] }>(ALL_TODOS);

  if (!data) return null;

  const { allTodos } = data;

  return (
    <TodoListWrap>
      {allTodos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </TodoListWrap>
  );
};

export default TodoList;
