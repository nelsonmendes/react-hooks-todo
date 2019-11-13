import React, { useContext, useEffect, useState } from "react";
import TodosContext from "../context";

export default function TodoForm() {
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = event => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "EDIT_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        value={todo}
        onChange={event => setTodo(event.target.value)}
        className="border-black border-solid border-2"
      ></input>
    </form>
  );
}
