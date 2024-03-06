//  query selectors
const taskForm = document.querySelector("form");
const taskInput = document.querySelector("#todoInput");
const taskList = document.querySelector("#taskList");
let currentTasks = [];

// event listeners
window.addEventListener("DOMContentLoaded", () => {
  if (checkLocalStorage() !== true) {
    currentTasks = JSON.parse(localStorage.getItem("currentTask.list"));
    currentTasks.forEach((task) => {
      createNewTask(task);
    });
  }
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (taskInput.value === "" || taskInput.value == null) return;
  createNewTask(taskInput.value);
  saveToLocalStorage(taskInput.value);
  taskInput.value = null;
});

taskList.addEventListener("click", (event) => {
  if (event.target.id === "task-delete") {
    deleteTask(event.target.closest(".task"));
  }
});

// check or save local storage
const checkLocalStorage = () => {
  return (
    localStorage.getItem("currentTask.list") === null ||
    localStorage.getItem("currentTask.list" === "")
  );
};

const saveToLocalStorage = (task) => {
  if (checkLocalStorage() !== true) {
    currentTasks = JSON.parse(localStorage.getItem("currentTask.list"));
  }
  currentTasks.push(task);
  localStorage.setItem("currentTask.list", JSON.stringify(currentTasks));
};

// functions for saving and deleting
const createNewTask = (task) => {
  const taskTemplate = document.querySelector("#task-template");
  const clonedList = document.importNode(taskTemplate.content, true);
  const taskTxt = clonedList.querySelector(".task-txt");
  taskTxt.innerText = task;
  taskList.appendChild(clonedList);
};

const deleteTask = (task) => {
  task.remove();
  const taskToBeDeleted = currentTasks.indexOf(
    task.querySelector(".task-txt").innerText
  );
  currentTasks.splice(taskToBeDeleted, 1);
  localStorage.setItem("currentTask.list", JSON.stringify(currentTasks));
};
