// Imports
import { Task, tasks } from './task.js';

// Get relevant elements from the DOM
const tasksElement = document.getElementById('tasks-ul');

// Function to add click event to remove button remove task from DOM
export const addRemoveListener = (task) => {
  document.getElementById(`remove-${task.index}`).addEventListener('click', (e) => {
    e.preventDefault();
    task.removeTask();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskID = document.getElementById(`task-${task.index}`);
    if (taskID.parentNode) {
      taskID.parentNode.removeChild(taskID);
    }
  });
};

// Function to add input event to form input to update task description and update local storage
export const editTask = (task) => {
  const taskInput = document.getElementById(`task-input-${task.index}`);

  taskInput.addEventListener('input', () => {
    task.updateDescription(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
};

// Function to append task to DOM
export const appendTask = (task) => {
  const newTask = document.createElement('li');
  newTask.classList.add('tasks-flex');
  newTask.id = `task-${task.index}`;
  newTask.innerHTML = `
      <div class="check">
        <input type="checkbox" name="task-${task.index}" id="task-${task.index}">
        <input type="text" value="${task.description}" class="strikethrough task-item" id="task-input-${task.index}"/>
      </div>
      <button class="move"><i class="fa-solid fa-jet-fighter-up"></i></button>
      <button class="remove" id="remove-${task.index}"></i><i class="fa-solid fa-trash-can"></i></button>
    `;

  tasksElement.appendChild(newTask);
};

// Add submit event listener to form to add task to local storage and DOM
export const createTask = () => {
  const taskDesc = document.getElementById('description');
  const newTask = new Task(taskDesc.value);
  newTask.addTask();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  appendTask(newTask);
  addRemoveListener(newTask);
  editTask(newTask);
};
