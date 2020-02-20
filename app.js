let todoItems = [];

// Add a new todo
document.querySelector('#input-text').addEventListener('keypress', addTodo);

// Mark item as done
document.querySelector('#todo-list').addEventListener('click', toggleCheckbox);

// Delete an item
document.querySelector('#todo-list').addEventListener('click', deleteItem);

// All, Active, Completed
document.querySelector('#nav-bar').addEventListener('click', displayItems);

// Clear completed
document.querySelector('#clear-btn').addEventListener('click', clearCompleted);


function addTodo(event) {
    if(event.keyCode == 13) {
        let textInput = event.target.value;
        if(textInput !== '') {
            const todo = {
            textInput,
            checked: false,
            id: Date.now(),
            };
            // add a new todo to the list todoItems
            todoItems.push(todo);
            // clear the input
            event.target.value = '';  
            // add new li to ul including todo data
            const listItem = document.querySelector('#todo-list');
            listItem.insertAdjacentHTML('beforeend', `
            <li class="todo-item ${todo.checked}" data-key="${todo.id}">
                <i class="far fa-circle checkbox" id="${todo.id}"></i>
                <label>${todo.textInput}</label>
                <i class="fas fa-times delete-item"></i>
            </li>
            `);
        }
        itemsLeft();
    }
}


function toggleCheckbox(event) {
    if(event.target.classList.contains('checkbox')) {
        const itemKey = event.target.parentElement.dataset.key;  
        toggle(itemKey);
    }
}


function toggle(itemKey) {
    // get the todos index in todoItems
    const itemIndex = todoItems.findIndex(item => item.id === Number(itemKey));
    // toggle the checkbox
    todoItems[itemIndex].checked = !todoItems[itemIndex].checked;
    
    const item = document.querySelector(`[data-key='${itemKey}']`);
    
    if(todoItems[itemIndex].checked) {
        item.firstElementChild.setAttribute('class', 'far fa-check-circle checkbox');
        item.setAttribute('class', 'todo-item overline');
    } else {      
        item.firstElementChild.setAttribute('class', 'far fa-circle checkbox');
        item.setAttribute('class', 'todo-item');
    }
    itemsLeft();
}


function deleteItem(event) {
    if(event.target.classList.contains('delete-item')) {
        // get the current itemKey
        const itemKey = event.target.parentElement.dataset.key;
        // remove the todo from the todoItems list
        todoItems = todoItems.filter(item => item.key !== Number(itemKey));
        // get the li that should be removed
        const todoElement = document.querySelector(`[data-key='${itemKey}']`);
        // remove the li
        todoElement.remove();
        // remove from the todoItems list
        todoItems = todoItems.filter(item => item.id != todoElement.dataset.key);
        itemsLeft();
    }
}


function clearCompleted() {
    const listItems = document.querySelectorAll('#todo-list li');   
    listItems.forEach(item => {
        if(!item.classList.contains('false')) {
            item.remove();
            itemsLeft();
        } 
    });
    // Clear the deleted items from the todoItems list
    todoItems = todoItems.filter(item => item.checked === false);
}


function displayItems(event) {
    const listItems = document.querySelectorAll('#todo-list li'); 
    listItems.forEach(item => {
        item.style.display = 'flex';
        if(event.target.parentElement.id === 'completed' && item.classList.contains('false')) {
            item.style.display = 'none';
        } else if(event.target.parentElement.id === 'active' && !item.classList.contains('false')) {
            item.style.display = 'none';
        }
    });    
}

function itemsLeft() {
    const todos = document.querySelector("#count");
    const numberOfItemsLeft = todoItems.filter(item => item.checked === false);
    todos.textContent = numberOfItemsLeft.length + ' items left';

    //Hide nav-bar and arrow
    if(numberOfItemsLeft.length === 0 && todoItems.length === 0) {
        document.querySelector('.list-container').style.display = 'none';
        document.querySelector('.fa-angle-down').style.display = 'none';
    } else {
        document.querySelector('.list-container').style.display = 'flex';
        document.querySelector('.fa-angle-down').style.display = 'block';
    }
}





