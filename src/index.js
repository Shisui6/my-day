// Imports
import { DateTime } from 'luxon';
import autoAnimate, { getTransitionSizes } from '@formkit/auto-animate';
import './style.css';
import { Task, tasks } from './modules/task.js';
import calender from './images/icons8-date-span-64.png';
import {
  createTask,
  appendTask,
  addRemoveListener,
  editTask,
  modifyBackground,
  checkTask,
  displayEmpty,
  clearList,
} from './modules/app.js';

// Get relevant elements from the DOM
const time = document.getElementById('time');
const form = document.getElementById('form-id');
const refresh = document.getElementById('refresh');
const clear = document.getElementById('clear-btn');
const list = document.getElementById('tasks-ul');
const empty = document.getElementById('empty');

// Use the DateTime object from luxon to display the current date and time in the DOM
time.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);

// Check if local storage exists on page load and use data to add tasks to DOM
if (localStorage.getItem('tasks')) {
  const tasksData = JSON.parse(localStorage.getItem('tasks'));
  tasksData.forEach((task) => {
    let newTask;
    if (task.completed) {
      newTask = new Task(task.description, task.completed);
    } else {
      newTask = new Task(task.description);
    }
    tasks.push(newTask);
    appendTask(newTask);
    addRemoveListener(newTask);
    editTask(newTask);
    checkTask(newTask);
    modifyBackground();
  });
}

// On page load, process image file and append to empty div
const myIcon = new Image();
myIcon.src = calender;
empty.insertBefore(myIcon, empty.firstChild);

// Add click event listener to refresh button to clear the tasks array and remove all tasks from DOM
refresh.addEventListener('click', () => {
  refresh.classList.toggle('down');
  setTimeout(() => {
    clearList();
  }, 1000);
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
  });
  modifyBackground();
  if (!tasks.length) {
    displayEmpty();
  }
});

// Library for adding transitions to DOM elements
autoAnimate(list, (el, action, oldCoords, newCoords) => {
  let keyframes;
  // supply a different set of keyframes for each action
  if (action === 'add') {
    keyframes = [
      { transform: 'translateX(-300px)', opacity: 0 },
      { transform: 'translateX(0px)', opacity: 1 },
    ];
  }
  // keyframes can have as many "steps" as you prefer
  // and you can use the 'offset' key to tune the timing
  if (action === 'remove') {
    keyframes = [
      { transform: 'translateX(0px)', opacity: 1 },
      { transform: 'translateX(300px)', opacity: 0 },
    ];
  }
  if (action === 'remain') {
    // for items that remain, calculate the delta
    // from their old position to their new position
    const deltaX = oldCoords.left - newCoords.left;
    const deltaY = oldCoords.top - newCoords.top;
    // use the getTransitionSizes() helper function to
    // get the old and new widths of the elements
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
    // set up our steps with our positioning keyframes
    const start = { transform: `translate(${deltaX}px, ${deltaY}px)` };
    const mid = { transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`, offset: 0.75 };
    const end = { transform: 'translate(0, 0)' };
    // if the dimensions changed, animate them too.
    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`;
      mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`;
      end.width = `${widthTo}px`;
    }
    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`;
      mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`;
      end.height = `${heightTo}px`;
    }
    keyframes = [start, mid, end];
  }
  // return our KeyframeEffect() and pass
  // it the chosen keyframes.
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: 'ease-out' });
});