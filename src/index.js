// Imports
import { DateTime } from 'luxon';
import autoAnimate from '@formkit/auto-animate';
import './style.css';
import { Task, tasks } from './modules/task.js';
import {
  createTask,
  appendTask,
  addRemoveListener,
  editTask,
  modifyBackground,
  checkTask,
} from './modules/app.js';

// Get relevant elements from the DOM
const time = document.getElementById('time');
const form = document.getElementById('form-id');
const refresh = document.getElementById('refresh');
const clear = document.getElementById('clear-btn');
const list = document.getElementById('tasks-ul');

autoAnimate(list);

// Use the DateTime object from luxon to display the current date and time in the DOM
time.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);

// Check if local storage exists on page load and use data to add tasks to DOM
if (localStorage.getItem('tasks')) {
  const tasksData = JSON.parse(localStorage.getItem('tasks'));
  tasksData.forEach((task) => {
    const newTask = new Task(task.description);
    tasks.push(newTask);
    appendTask(newTask);
    addRemoveListener(newTask);
    editTask(newTask);
    checkTask(newTask);
    modifyBackground();
  });
}

// Add click event listener to refresh button to clear the tasks array and remove all tasks from DOM
refresh.addEventListener('click', () => {
  refresh.classList.toggle('down');
  const ul = document.querySelector('ul');
  let child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
  tasks.length = 0;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  modifyBackground();
});

// Add event listener to form to create a new task and add it to the DOM
form.addEventListener('submit', (e) => {
  e.preventDefault();
  createTask();
  form.reset();
});

// Add event listener to clear button to remove completed tasks from the DOM
clear.addEventListener('click', () => {
  const newTasks = tasks.filter((task) => task.completed === false);
  tasks.length = 0;
  newTasks.forEach((task) => {
    tasks.push(task);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.querySelectorAll('ul > li.complete').forEach((el) => {
    el.parentNode.removeChild(el);
    modifyBackground();
  });
});
