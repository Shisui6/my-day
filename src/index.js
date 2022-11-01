// Imports
import { DateTime } from 'luxon';
import './style.css';

// Declare tasks array
const tasks = [
  {
    index: 0,
    description: 'Set up webpack',
    completed: false,
  },
  {
    index: 1,
    description: 'Set up linters',
    completed: false,
  },
  {
    index: 2,
    description: 'Create TO-do-list application',
    completed: false,
  },
];

// Get relevant elements from the DOM
const tasksElement = document.getElementById('tasks-ul');
const time = document.getElementById('time');

// Function to add each task to the Dom on page load
const displayTasks = () => {
  tasks.forEach((task) => {
    const newTask = document.createElement('li');
    newTask.classList.add('tasks-flex');
    newTask.innerHTML = `
      <div class="check">
        <input type="checkbox" name="task-${task.index}" id="task-${task.index}">
        <label for="task-${task.index}" class="strikethrough"> ${task.description}</label>
      </div>
      <button class="move"><i class="fa-solid fa-jet-fighter-up"></i></button>
    `;
    tasksElement.appendChild(newTask);
  });
};

// Call displayTasks function
displayTasks();

// Use the DateTime object from luxon to display the current date and time in the DOM
time.innerText = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
