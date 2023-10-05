import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_TODOS } from "../graphql/query";
import { TodoAttributes } from "../types";
import styled from "styled-components";
import { DELETE_TODO } from "../graphql/mutation";

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
  button {
    cursor: pointer;
    background: red;
    color: white;
    border: none;
    padding: 10px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const TodoListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Todo = (data: TodoAttributes) => {
  const [deleteTodo] = useMutation<
    { deleteTodo: boolean },
    Pick<TodoAttributes, "id">
  >(DELETE_TODO);

  const { title, content, id } = data;

  const handleClickDelete = () => {
    deleteTodo({
      variables: { id },
      update(cache, { data }) {
        if (!data) return;
        const { deleteTodo: isDeleteSuccess } = data;

        if (!isDeleteSuccess) return;

        const prevData = cache.readQuery<{ allTodos: TodoAttributes[] }>({
          query: ALL_TODOS,
        });

        cache.writeQuery({
          query: ALL_TODOS,
          data: {
            allTodos: prevData?.allTodos.filter((prev) => prev.id !== id),
          },
        });
      },
    });
  };

  return (
    <TodoWrap>
      <h3>title : {title}</h3>
      <span>content : {content}</span>
      <button onClick={handleClickDelete}>delete</button>
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
