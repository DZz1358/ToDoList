let addText = document.querySelector('.message');
let addBtn = document.querySelector('.add');
let todo = document.querySelector('.todo');


let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addBtn.addEventListener('click', function () {
    if (!addText.value) return;
    let newTodo = {
        todo: addText.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addText.value = '';
});

function displayMessages() {
    let displayMessage = '';
    if (todoList === 0) todo.innerHTML = '';
    todoList.forEach(function (item, i) {
        displayMessage += `
        <li>
            <div>
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
            </div>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
})

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault()
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

})