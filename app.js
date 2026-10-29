const taskInput = document.getElementById("add-task");
const addButton = document.querySelector(".add");
const incompleteTaskList = document.getElementById("active-tasks");
const completedTasksList = document.getElementById("done-tasks");
const taskItems = [...incompleteTaskList.children, ...completedTasksList.children];

const createElement = function (tag, { className, text } = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createNewTaskElement = function (taskText) {
  const listItem = createElement("li");
  const checkBox = createElement("input");
  const label = createElement("label", { text: taskText, className: "task" });
  const editInput = createElement("input", { className: "task" });
  const editButton = createElement("button", { text: "Edit", className: "edit" });
  const deleteButton = createElement("button", { className: "delete" });
  const deleteButtonImg = createElement("img");

  editInput.type = "text";
  checkBox.type = "checkbox";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove task";
  deleteButton.setAttribute("aria-label", "Delete task");
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  const inputValue = taskInput.value.trim();
  if (!inputValue) return;
  const listItem = createNewTaskElement(inputValue);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("edit-mode");

  if (isEditMode) {
    const editValue = editInput.value.trim();

    if (!editValue) {
      editInput.focus();
      return;
    }
    label.textContent = editValue;
    editBtn.textContent = "Edit";
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.remove();
};

const handleCheckbox = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTaskList;
  targetList.appendChild(listItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.addEventListener("change", handleCheckbox);
};

taskItems.forEach((taskItem) => bindTaskEvents(taskItem));