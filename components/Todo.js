class Todo {
    constructor(data, selector, id) {
      this._data = {...data, id: id};
      this._selector = selector;
      this._deleteButton = null
      this._checkbox = null
      this._todoElement = null
    }
  
    // Private method to set event listeners
    _setEventListeners() {
        //const deleteButton = todoElement.querySelector(".todo__delete");
        // Handle checkbox toggle
        this._checkbox.addEventListener("change", () => {
            this._data.completed = this._checkbox.checked;
        });

        // Handle delete button click
        this._deleteButton.addEventListener("click", () => {
            //this._deleteButton.remove();
            console.log(this._todoElement)
            this._todoElement.remove()
        });
    }
  
    // Public method to generate the todo element
    getView() {
        const todoTemplate = document.querySelector("#todo-template");
        const todoElement = todoTemplate.content.querySelector(".todo").cloneNode(true);
        this._todoElement = todoElement
        //const todoElement = template.querySelector(".todo");
        const todoNameEl = todoElement.querySelector(".todo__name");
        this._checkbox = todoElement.querySelector(".todo__completed");
        const todoLabel = todoElement.querySelector(".todo__label");
        const todoDate = todoElement.querySelector(".todo__date");
        this._deleteButton = todoElement.querySelector(".todo__delete-btn");

        todoNameEl.textContent = this._data.name;
        this._checkbox.checked = this._data.completed;

        // Apply id and for attributes.
        // The id will initially be undefined for new todos.
        this._checkbox.id = `todo-${this._data.id}`;
        todoLabel.setAttribute("for", `todo-${this._data.id}`);

        // If a due date has been set, parsing this it with `new Date` will return a
        // number. If so, we display a string version of the due date in the todo.
        const dueDate = new Date(this._data.date);
        if (!isNaN(dueDate)) {
            todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            })}`;
        }

        /*
        this._deleteButton.addEventListener("click", () => {
            todoElement.remove();
          });
        */
        this._setEventListeners()

        return todoElement;
    }
  }
  
  export default Todo;
  