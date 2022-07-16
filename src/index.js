import './style.css';
import { Task, lists } from './HandListStorage.js';

class Todo {
  static displayStoarageTasks() {
    const ArrTasks = lists.getTasks();
    ArrTasks.forEach((task) => Todo.addlist(task));
  }

  static addlist(tasks) {
    const task = document.querySelector('.tasks');
    const listitem = document.createElement('li');
    listitem.classList.add('list');
    listitem.innerHTML += `<div class='item-label' >
    <div class='item-descriptiont'>
      <input type="checkbox" class='check-box'>
      <input type="text" id="task-${tasks.index}" class="inputTask" value="${tasks.description}" disabled= true >
      </div>
    <div class='item-content'>
    <button type="submit" id="${tasks.index}" class="edit">Edit</button>
    <button type="submit" class="delete">Delete</button>
  </div>
  </div> `;
    task.appendChild(listitem);
  }

  static deleteTask(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }
}

const form = document.querySelector('.form');
const input = document.querySelector('.write-task');
let id = 0;

// prevent the from by submitting the tasks
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // validation
  // eslint-disable-next-line no-empty
  if (input.value.trim() === '') {
  }
  // create a task with constructor and display it
  const tasks = new Task(input.value, false, id);
  id += 1;
  Todo.addlist(tasks);

  // clear the input field
  input.value = '';

  // add to tasks to localStorage
  lists.addTask(tasks);
});

// call the Storage when the DomLoad
document.addEventListener('DomContentLoaded', Todo.displayStoarageTasks());

// deleting the task element
document.querySelector('.tasks').addEventListener('click', (e) => {
  const el = e.target;
  Todo.deleteTask(el);

  // clear all completed
  if (el.classList.contains('check-box')) {
    if (el.checked) {
      const { id } = el.parentElement.lastElementChild;
      const getel = el.parentElement.parentElement.lastElementChild.firstElementChild.id;
      const taskToComplete = document.getElementById(id);
      taskToComplete.classList.toggle('line-through');

      // get the arr and change the status of the element
      const tasks = lists.getTasks();
      tasks[getel].completed = true;

      localStorage.setItem('task', JSON.stringify(tasks));
    }
  }

  // delete to localStorage
  const index = el.parentElement.previousElementSibling.lastElementChild.value;
  lists.deleteTaks(el, index);
  // edit tasks
  const ids = `task-${el.id}`;
  const editTask = document.getElementById(ids);
  editTask.disabled = false;

  document.addEventListener('keypress', (i) => {
    const tasks = lists.getTasks();
    tasks[el.id].description = i.target.value;

    if (i.key === 'Enter') {
      localStorage.setItem('task', JSON.stringify(tasks));
      editTask.disabled = true;
    }
  });
});
// clear all elements
const clearList = document.querySelector('.clear-element');
clearList.addEventListener('click', () => {
  lists.clearCompleted();
});