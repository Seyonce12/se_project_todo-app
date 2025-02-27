import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Todo from "../components/Todo.js";
import { validationConfig, initialTodos } from "../utils/constants.js";
import FormValidator from '../components/FormValidator.js';
console.log(initialTodos)

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms['add-todo-form'];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const newId = uuidv4()
  const todo = new Todo(data, '#todo-template', newId)
  return todo.getView()
};

const renderTodo = (item) => {
  const todo = generateTodo(item)
  todosList.append(todo)
}


addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const validator = new FormValidator(validationConfig, addTodoForm)
validator.enableValidation()

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  /*
  const todo = generateTodo(values);
  todosList.append(todo);
  */
  renderTodo(values)
  validator.resetValidation()
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item)
});
