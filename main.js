'use strict';

// Variables
let count;
let todoList = [];
let completedTodo = [];
let activeTodo = [];

// Add a new todo
document.querySelector('#input-text').addEventListener('keypress', addTodo);

// Toggle todo items checkbox
document.querySelector('#todo-list').addEventListener('click', toggleCheckbox);

// Delete todo item
document.querySelector('#todo-list').addEventListener('click', deleteItem);

// Toggle all todo items
//document.querySelector('.fa-angle-down').addEventListener('click', toggleTodos);

// Clear all completed todos
//document.querySelector('ul #nav-bar li:last-child').addEventListener('click', clearCompleted);


function addTodo(e) {
    if(e.key === 'Enter') {      
    // create li and span
    const li = document.createElement('li');
    const span = document.createElement('span');
    // add a class to the li
    li.className = 'todo-item';
    // create new i element
    const deleteIcon = document.createElement('i');
    const uncheckedIcon = document.createElement('i');
    // add a class to the i
    deleteIcon.className = 'fas fa-times delete-item'; 
    uncheckedIcon.className = 'far fa-circle';
    // add icon html
    deleteIcon.innerHTML = '<i></i>';
    uncheckedIcon.innerHTML = '<i></i>';
    // append the icon and span to the li
    li.appendChild(uncheckedIcon);
    li.appendChild(span);
    //create text node and append to the span
    span.appendChild(document.createTextNode(e.target.value));
    // append the icon to the li
    li.appendChild(deleteIcon);
    // append li to th ul
    const theList = document.querySelector('#todo-list');
    theList.appendChild(li);
    // clear input
    e.target.value = '';
    // Add 1 to the counter
    counter();
    // add to todoList
    todoList.push(li);
    }    
}

function toggleCheckbox(e) {
    // get the li with the toggeld todo
    const newLi = e.target.parentElement;
    
    // check which state the checkbox is in abnd add to list "completedTodo"
    if(e.target.getAttribute('class') === 'far fa-circle') {  
        e.target.setAttribute('class', 'far fa-check-circle');
        e.target.parentElement.setAttribute('class', 'todo-item overline');
        addComplTodoList(e);
        //completedTodo.push(newLi);
    } else if(e.target.getAttribute('class') === 'far fa-check-circle') {
        e.target.setAttribute('class', 'far fa-circle');
        e.target.parentElement.setAttribute('class', 'todo-item');
        removeComplTodoList(e);
        //const arrIndex = completedTodo.indexOf(newLi);
        //completedTodo = completedTodo.slice(0, arrIndex).concat(completedTodo.slice(arrIndex + 1, completedTodo.length));
    } 
    //counter();
}
 
// function deleteItem(e) {
//     if(e.target.classList.contains('delete-item')) {
//         e.target.parentElement.remove();
//         counter();
//     }
// }

function deleteListItem(e) {
    e.target.parentElement.remove();
    counter();
}

function addComplTodoList(e) {
    const newLi = e.target.parentElement;
    completedTodo.push(newLi);
    console.log("addin: " + newLi);
    counter();
}

function removeComplTodoList(e) {
    const newLi = e.target.parentElement;
    const arrIndex = completedTodo.indexOf(newLi);
    completedTodo = completedTodo.slice(0, arrIndex).concat(completedTodo.slice(arrIndex + 1, completedTodo.length));
    console.log("removin: " + newLi);
    counter();
}

function deleteItem(e) {
    if(e.target.classList.contains('delete-item')) {
        deleteListItem(e);
    } else if(e.target.classList.contains('overline')) {
        removeComplTodoList(e);
    }
}

function counter() {
    const todoItems = document.querySelector('#todo-list');
    count = todoItems.children.length - completedTodo.length;
    const increaseCount = document.querySelector("#count");

    if(todoItems.firstElementChild !== null && count <= 0) {
        increaseCount.textContent = 0 + ' items left';
    } else {
        increaseCount.textContent = count + ' items left';
    }
    

    //Hide nav-bar and arrow
    if(todoItems.firstElementChild === null) {
        document.querySelector('.list-container').style.display = 'none';
        document.querySelector('.fa-angle-down').style.display = 'none';
    } else {
        document.querySelector('.list-container').style.display = 'flex';
        document.querySelector('.fa-angle-down').style.display = 'block';
    }
}




















