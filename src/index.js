import './style.css';
import { Task, lists } from './HandListStorage';

class Todo {

    static displayStoarageTasks(){
      let ArrTasks = lists.getTasks();
      ArrTasks.forEach((task)=> Todo.addlist(task));
    }



  static addlist(tasks) {
    const task = document.querySelector('.tasks');
    const listitem = document.createElement('li');
    listitem.classList.add('list');
    listitem.innerHTML += `<div class='item-label'>
    <div class='item-descriptiont'>
      <input type="checkbox" id="check" name='check'>
      <label for='' class="label" contentEditable="true">${tasks.description}</label>
      </div>
    <div class='item-content'>
      <button type="submit"  class="edit">Edit</button>
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
  if (input.value.trim() === '') {
    return null;
      } else {
    // create a task with constructor and display it
    const tasks = new Task(input.value, false, id);
    id++;
    Todo.addlist(tasks);

        // clear the input field
        input.value = '';

    // add to tasks to localStorage
    lists.addTask(tasks);



    // line through the item when clicked
    const check = document.querySelector('#check');
    if (check.checked) {
      const label = document.querySelectorAll('.label');
      label.forEach((e) => e.classList.toggle('line-through'));
    }
  }
});

// call the Storage when the DomLoad
document.addEventListener('DomContentLoaded', Todo.displayStoarageTasks());


// deleting the task element
document.querySelector('.tasks').addEventListener('click', (e) => {
  const el = e.target;
  Todo.deleteTask(el);

  // delete to localStorage
  const index = el.parentElement.previousElementSibling.lastElementChild.innerText;
  lists.deleteTaks(el, index);
});

// clear all elements
const clearList = document.querySelector('.clear-element');
clearList.addEventListener('click', () => {
  document.querySelector('.tasks').innerHTML = '';
});