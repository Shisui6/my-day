// Declare tasks array
const tasks = [];

// Create class declaration for tasks in task array
class Task {
  constructor(description) {
    this.index = tasks.length + 1;
    this.description = description;
    this.completed = false;
  }

  addTask() {
    tasks.push(this);
  }

  removeTask() {
    const index = tasks.indexOf(this);
    tasks.splice(index, 1);
    for (let i = index; i < tasks.length; i += 1) {
      tasks[i].index -= 1;
    }
  }

  updateDescription(desc) {
    const index = tasks.indexOf(this);
    tasks[index].description = desc;
  }

  toggleCompleted() {
    const index = tasks.indexOf(this);
    tasks[index].completed = !tasks[index].completed;
  }
}

export { tasks, Task };