import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      const toogledTodos = state.todos.map(t =>
        t.id === action.payload ? { ...t, complete: !t.complete } : t
      );
      return {
        ...state,
        todos: toogledTodos
      };
    case "REMOVE_TODO":
      const filteredTodo = state.todos.filter(t => t.id !== action.payload);
      const isRemovedTodo =
        state.currentTodo.id === action.payload ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodo
      };
    case "EDIT_TODO":
      if (!action.payload) {
        return state;
      }
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const currentTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, currentTodoIndex),
        updatedTodo,
        ...state.todos.slice(currentTodoIndex + 1)
      ];
      return {
        ...state,
        todos: updatedTodos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      const newTodo = {
        id: uuidv4(),
        complete: false,
        text: action.payload
      };
      const newTodos = [...state.todos, newTodo];
      return {
        ...state,
        todos: newTodos
      };
    default:
      return state;
  }
}
