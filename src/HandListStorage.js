// eslint-disable-next-line max-classes-per-file
export class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = false;
    this.index = index;
  }
}

export class lists {
  // store elements with localStorage
  static getTasks() {
    let task;
    if (localStorage.getItem('task') === null) {
      task = [];
    } else {
      task = JSON.parse(localStorage.getItem('task'));
    }
    return task;
  }

  // add to storage
  static addTask(tasks) {
    const task = lists.getTasks();
    task.push(tasks);
    localStorage.setItem('task', JSON.stringify(task));
  }

  // delete to storage
  static deleteTaks(element, check) {
    const tasks = lists.getTasks();

    // first check if the clicked element contains delete class
    if (element.classList.contains('delete')) {
      tasks.forEach((task, index) => {
        // if the task matches with the array description splice the array from there
        if (task.description === check) {
          tasks.splice(index, 1);
        }
      });
    }
    localStorage.setItem('task', JSON.stringify(tasks));
  }

  static clearCompleted() {
    let tasks = lists.getTasks();
    tasks = tasks.filter((task) => !task.completed);
    localStorage.setItem('task', JSON.stringify(tasks));
    // reloading the window after clearing all completed
    window.location.reload();
  }
}