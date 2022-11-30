import React, { useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { addTodo, deleteTodo, selectTodo } from "@stores/todo/todoSlice";
import { useAppDispatch } from "@stores/store";
import { getRandomData } from "@stores/todo/todoThunk";

export const Todo = () => {
  const { todos } = useSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  // const [data, setData] = useState<any>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(value));
  };

  return (
    <div style={{ fontSize: "30px" }}>
      Todo page <ArrowDownOutlined />
      <button onClick={() => dispatch(getRandomData())}>GET</button>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
