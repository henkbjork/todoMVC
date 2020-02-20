let todoItems = [];

// Add a new todo
document.querySelector('#input-text').addEventListener('keypress', addTodo);

// Mark item as done
document.querySelector('#todo-list').addEventListener('click', toggleCheckbox);

// Delete an item


// Items left

// All

// Active

// Completed

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
            <li class="todo-item" data-key="${todo.id}">
                <i class="far fa-circle checkbox" id="${todo.id}"></i>
                <label>${todo.textInput}</label>
                <i class="fas fa-times delete-item"></i>
            </li>
            `);
        }
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
    }
}


function clearCompleted(event) {
    todoItems = [];
    console.log(todoItems.length);
    const listItems = document.querySelectorAll('#todo-list li');
    console.log(listItems);
    listItems.forEach(item => {
        if(item.classList.contains('overline')) {
            item.remove();
        }
    });
}






