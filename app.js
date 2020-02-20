let todoItems = [];

// Add a new todo
document.querySelector('#input-text').addEventListener('keypress', getTodoText);

// Mark item as done
document.querySelector('#todo-list').addEventListener('click', toggleCheckbox);

// Delete an item
document.querySelector('#todo-list').addEventListener('click', deleteItem);

function addTodo(textInput) {
    const todo = {
        textInput,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    // clear the input
    event.target.value = '';  
    // add new li to ul including todo data
    const listItem = document.querySelector('#todo-list');
    listItem.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
        <i class="far fa-circle" id="${todo.id}"></i>
        <span>${todo.textInput}</span>
        <i class="fas fa-times delete-item"></i>
    </li>
    `);
}

function getTodoText(event) {
    if(event.keyCode == 13) {
        let textInput = event.target.value;
        if(textInput !== '') {
            addTodo(textInput);
        }
    }
}


function toggleCheckbox(event) {
    if(event.target.classList.contains('far')) {
        const itemKey = event.target.parentElement.dataset.key;  
        toggle(itemKey);
    }
}


function toggle(itemKey) {
    const itemIndex = todoItems.findIndex(item => item.id === Number(itemKey));
    todoItems[itemIndex].checked = !todoItems[itemIndex].checked;

    const item = document.querySelector(`[data-key='${itemKey}']`);
    
    if(todoItems[itemIndex].checked) {
        item.firstElementChild.setAttribute('class', 'far fa-check-circle');
        item.setAttribute('class', 'todo-item overline');
    } else {      
        item.firstElementChild.setAttribute('class', 'far fa-circle');
        item.setAttribute('class', 'todo-item');
    }
}


function deleteItem(event) {
    if(event.target.classList.contains('delete-item')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggle(itemKey);
        todoItems = todoItems.filter(item => item.key !== Number(itemKey));
        const todoElement = document.querySelector(`[data-key='${itemKey}']`);
        todoElement.remove();
    }
}






