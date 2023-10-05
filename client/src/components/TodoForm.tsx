import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import styled from "styled-components";
import { ADD_TODO } from "../graphql/mutation";
import { TodoAttributes, TodoCreationAttributes } from "../types";
import { ALL_TODOS } from "../graphql/query";

const TodoFormWrap = styled.form`
  display: flex;
  gap: 10px;
  div {
    display: flex;
    gap: 5px;
  }
  input {
    font-size: 15px;
    padding: 10px;
  }
  button {
    cursor: pointer;
  }
`;

const TodoForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const [addTodo] = useMutation<
    { addTodo: TodoAttributes },
    TodoCreationAttributes
  >(ADD_TODO);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current || !contentRef.current) return;

    addTodo({
      variables: {
        title: titleRef.current.value,
        content: contentRef.current.value,
      },
      refetchQueries: [ALL_TODOS],
    });

    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  return (
    <TodoFormWrap onSubmit={handleSubmit}>
      <div>
        <input ref={titleRef} placeholder="title" />
        <input ref={contentRef} placeholder="content" />
      </div>
      <button>submit</button>
    </TodoFormWrap>
  );
};

export default TodoForm;
