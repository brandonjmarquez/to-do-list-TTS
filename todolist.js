function addRow(table, taskText, categoryText) {
  let row = document.createElement('tr');
  let completed = document.createElement('td');
  let completedCheckbox = document.createElement('input');
  let editButton = document.createElement('button');
  let removeButton = document.createElement('button');
  let task = document.createElement('td');
  let taskInput = document.createElement('input');
  let category = document.createElement('td');
  let categoryInput = document.createElement('input');

  taskInput.value = taskText;
  categoryInput.value = categoryText;
  taskInput.disabled = true;
  categoryInput.disabled = true;
  taskInput.classList.add('task-input')
  categoryInput.classList.add('task-input')
  task.appendChild(taskInput);
  category.appendChild(categoryInput)


  completedCheckbox.type = 'checkbox';
  editButton.type = 'button';
  editButton.innerText = '✏️';
  removeButton.type = 'button';
  removeButton.innerText = '🗑️';
  completed.appendChild(editButton);
  completed.appendChild(removeButton);
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
  let rowParent = e.target.parentElement.parentElement;
  let toDos = rowParent.parentElement;

  if(rowParent.tagName === 'TR' && rowParent.id !== 'labels' && rowParent.id !== 'inputs') {
    if(neverDeleted) {
      if(confirm('This will delete the task.\nProceed?')) {
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
    let task = e.target.parentElement.nextElementSibling.querySelector('input');
    let category = e.target.parentElement.nextElementSibling.nextElementSibling.querySelector('input');

    task.classList.toggle('completed');
    category.classList.toggle('completed');
  }
}

function editTask(e) {
  console.log(e.target)
  let taskInput = e.target.parentElement.nextElementSibling.querySelector('input');
  let categoryInput = e.target.parentElement.nextElementSibling.nextElementSibling.querySelector('input');
  console.log(taskInput, categoryInput)

  if(taskInput.disabled) {
    taskInput.disabled = false;
    categoryInput.disabled = false;
    taskInput.classList.toggle('task-input')
    categoryInput.classList.toggle('task-input')
  } else {
    taskInput.disabled = true;
    categoryInput.disabled = true;
    taskInput.classList.toggle('task-input')
    categoryInput.classList.toggle('task-input')
  }
  

}

function tableClickHandler(e) {
  switch (e.target.type) {
    case 'checkbox':
      markAsComplete(e);
      break;
    case 'button':
      if(e.target.innerText === '✏️') {
        console.log()
        editTask(e);
      } else if(e.target.innerText === 'Add Task') {
        console.log('hello')
        addToDo()
      } else if(e.target.innerText === '🗑️') {
        removeRow(e);
      }
      break;
  } 
}

let neverDeleted = true;

// let addButton = document.getElementById('add-button');
// addButton.addEventListener('click', addToDo);
let table = document.getElementById('todo-table');
table.addEventListener('dblclick', removeRow)
table.addEventListener('click', tableClickHandler)