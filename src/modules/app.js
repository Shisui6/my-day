// Imports
import { Task, tasks } from './task.js';
import taskImage from '../images/tasks.jpg';
import taskImage1 from '../images/tasks4.jpg';

// Get relevant elements from the DOM
const tasksElement = document.getElementById('tasks-ul');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const empty = document.getElementById('empty');
const form = document.getElementById('form-id');
const clear = document.getElementById('clear-btn');
const refresh = document.getElementById('refresh');
const ul = document.querySelector('ul');

// Function to alter the background styling when there are more than four elements in the task array
export const modifyBackground = () => {
  if (tasks.length > 4) {
    main.style.height = '100%';
    main.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${taskImage1})`;
    footer.style.position = 'static';
    footer.style.bottom = '';
    form.style.position = 'static';
    form.style.bottom = '';
    form.style.marginBottom = '30px';
  } else {
    main.style.height = '100vh';
    main.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${taskImage})`;
    footer.style.position = 'absolute';
    footer.style.bottom = '0';
    form.style.position = 'absolute';
    form.style.bottom = '80px';
    form.style.marginBottom = '';
  }
};

// Function to display empty div
export const displayEmpty = () => {
  empty.classList.toggle('hide');
  clear.classList.toggle('hide');
  refresh.classList.toggle('hide');
};

// Function to remove all list items iteratively after 1 second
const removeChildren = (i) => {
  setTimeout(() => {
    const child = ul.lastElementChild;
    ul.removeChild(child);
    tasks.length -= 1;
    if (tasks.length === 4) {
      modifyBackground();
    }
    if (!tasks.length) {
      displayEmpty();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, 700 * i);
};

// Function to clear all tasks
export const clearList = () => {
  let i = 0;
  const count = ul.childElementCount;
  while (i < count) {
    removeChildren(i);
    i += 1;
  }
};

// Function to add click event to remove button remove task from DOM
export const addRemoveListener = (task) => {
  document.getElementById(`remove-${task.index}`).addEventListener('click', (e) => {
    e.preventDefault();
    task.removeTask();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (e.target.tagName === 'I') {
      e.target.parentNode.parentNode.parentNode.remove();
    } else {
      e.target.parentNode.parentNode.remove();
    }
    if (!tasks.length) {
      displayEmpty();
    }
    modifyBackground();
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

// Funtion to toggle the completed state of each task
export const checkTask = (task) => {
  const check = document.getElementById(`task-check-${task.index}`);
  const taskInput = document.getElementById(`task-input-${task.index}`);

  check.addEventListener('change', () => {
    task.toggleCompleted();
    check.parentNode.parentNode.classList.toggle('complete');
    taskInput.classList.toggle('strikethrough');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
};

// Function to append task to DOM
export const appendTask = (task) => {
  const newTask = document.createElement('li');
  if (task.completed) {
    newTask.classList.add('complete');
  }
  newTask.id = `task-${task.index}`;
  newTask.innerHTML = `
      <label class="checkbox-cont">
        <input type="checkbox" name="task-${task.index}" id="task-check-${task.index}" ${task.completed ? 'checked' : ''}>
        <span class="checkbox-custom"></span>
      </label>
      <div class="check-bros">
        <input type="text" value="${task.description}" class="task-item ${task.completed ? 'strikethrough' : ''}" id="task-input-${task.index}"/>
        <button class="remove" id="remove-${task.index}"></i><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

  tasksElement.appendChild(newTask);
  if (tasks.length === 1) {
    displayEmpty();
  }
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
  checkTask(newTask);
  modifyBackground();
};
