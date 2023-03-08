function addRow(table, taskText, categoryText) {
  let row = document.createElement('tr');
  let completed = document.createElement('td');
  let completedCheckbox = document.createElement('input');
  let task = document.createElement('td');
  let category = document.createElement('td');

  completedCheckbox.type = 'checkbox';
  task.innerText = taskText;
  category.innerText = categoryText;
  completed.appendChild(completedCheckbox);
  completed.classList.add('checkbox-container');
  category.classList.add('todo-text');
  row.classList.add('todo-row');
  row.appendChild(completed);
  row.appendChild(task);
  row.appendChild(category);
  table.querySelector('tbody').appendChild(row);
}

function addToDo() {
  let taskText = document.getElementById('add-task').value;
  let categoryText = document.getElementById('add-category').value;
  let table = document.getElementById('todo-table');
  
  if(categoryText.length !== 0 && taskText.length !== 0)
    addRow(table, taskText, categoryText);

  document.getElementById('add-task').value = ''
  document.getElementById('add-category').value = '';
}

function removeRow(e) {
  console.log(e.target.parentElement.id);
  let rowParent = e.target.parentElement;
  let toDos = rowParent.parentElement;

  if(rowParent.tagName === 'TR' && rowParent.id !== 'labels' && rowParent.id !== 'inputs') {
    if(neverDeleted) {
      if(confirm('Double clicking a row deletes.\nProceed?')) {
        neverDeleted = false;
        toDos.removeChild(rowParent);
      }
      return;
    }
    toDos.removeChild(rowParent);
  }
}

function markAsComplete(e) {
  console.log(e.target.type)
  if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    console.log(e.target)
    console.log(e.target.parentElement)
    console.log(e.target.parentElement.nextElementSibling)
    let task = e.target.parentElement.nextElementSibling;
    let category = task.nextElementSibling;

    task.classList.toggle('completed');
    category.classList.toggle('completed');
  }
}

let neverDeleted = true;

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', addToDo);
let table = document.getElementById('todo-table');
table.addEventListener('dblclick', removeRow)
table.addEventListener('click', markAsComplete)