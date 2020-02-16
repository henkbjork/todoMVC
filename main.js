// Counter
let count;
let completedTodo = [];
let todoList = [];

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
    const todoList = document.querySelector('#todo-list');
    todoList.appendChild(li);
    // clear input
    e.target.value = '';
    // Add 1 to the counter
    counter();
    }
}

function toggleCheckbox(e) {
    if(e.target.getAttribute('class') === 'far fa-circle') {
        //const newLi = e.target.parentElement;    
        e.target.setAttribute('class', 'far fa-check-circle');
        e.target.parentElement.setAttribute('class', 'todo-item overline');
        //completedTodo.push(newLi);
    } else if(e.target.getAttribute('class') === 'far fa-check-circle') {
        e.target.setAttribute('class', 'far fa-circle');
        e.target.parentElement.setAttribute('class', 'todo-item');
    }    
}

function deleteItem(e) {
    if(e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove();
        counter();
    }
}

function counter() {
    const todoList = document.querySelector('#todo-list');
    count = todoList.children.length;
    const increaseCount = document.querySelector("#count");
    increaseCount.textContent = count + ' items left';
    //Hide nav-bar and arrow
    if(count === 0) {
        document.querySelector('.list-container').style.display = 'none';
        document.querySelector('.fa-angle-down').style.display = 'none';
    } else {
        document.querySelector('.list-container').style.display = 'flex';
        document.querySelector('.fa-angle-down').style.display = 'block';

    }
}


function clearCompleted(e) {
 
    console.log("here");
    
}



















