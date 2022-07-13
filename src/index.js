import './style.css';

const lists = [
  {
    description: 'Sleeping earlier during the week',
    completed: false,
    index: 0,
  },
  {
    description: 'relaxingonly in week-end',
    completed: false,
    index: 1,
  },
  {
    description: 'Submitted every project before the deadlines',
    completed: false,
    index: 2,
  },
  {
    description: 'Enjoy every single achievement',
    completed: false,
    index: 3,
  },
];

class Todo {
  static addlist(item) {
    const task = document.querySelector('.tasks');
    const listitem = document.createElement('li');
    listitem.innerHTML += `<div class='item-label'>
            <input type="checkbox" id="check" name="check">
            <label for="" class="label">${item.description}</label>
            </div>  `;
    task.appendChild(listitem);
  }
}
for (let i = 0; i < lists.length; i += 1) {
  Todo.addlist(lists[i]);
}
// line through the item when clicked
const label = document.querySelectorAll('.label');

label.forEach((label) => label.addEventListener('click', () => {
  label.style.textDecoration = 'line-through';
}));

// clear all elements
const clearList = document.querySelector('.clear-element');
clearList.addEventListener('click', () => {
  document.querySelector('.tasks').innerHTML = '';
});
