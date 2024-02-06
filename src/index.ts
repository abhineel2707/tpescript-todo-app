interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("#todoform")! as HTMLFormElement;
const todoContainer = document.querySelector("#todolist")! as HTMLUListElement;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON == null) return [];
  else return JSON.parse(todoJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  todos.push(newTodo);
  createTodo(newTodo);

  saveTodos();
  input.value = "";
}

function createTodo(todo: Todo) {
  const newListItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function (e) {
    todo.completed = checkbox.checked;
    saveTodos();
  });

  newListItem.append(todo.text);
  newListItem.append(checkbox);
  todoContainer.append(newListItem);
}

form.addEventListener("submit", handleSubmit);
