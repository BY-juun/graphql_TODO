import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import styled from "styled-components";

const AppWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;

const App = () => {
  return (
    <AppWrap>
      <TodoForm /> <TodoList />
    </AppWrap>
  );
};

export default App;
