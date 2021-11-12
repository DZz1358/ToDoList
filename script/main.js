let addText = document.querySelector('.message');
let addBtn = document.querySelector('.add');
let todo = document.querySelector('.todo');

const updateLocal = () => {
    localStorage.setItem('todo', JSON.stringify(todoList));
}

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addText.addEventListener("keyup", function (event) {
    if (!addText.value) return;
    if (event.keyCode === 13) {
        event.preventDefault();

        let newTodo = {
            todo: addText.value,
            checked: false,
            important: false
        };

        todoList.push(newTodo);
        displayMessages();
        updateLocal();
        addText.value = '';
    }
});

addBtn.addEventListener('click', function () {
    if (!addText.value) return;
    let newTodo = {
        todo: addText.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    updateLocal();
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
            <div>
                <button onclick="delTodo(${i})" class="delBtn"> Delete </button>
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
            updateLocal();
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
            updateLocal();
        }
    });
})

const delTodo = (index) => {
    todoList.splice(index, 1);

    displayMessages();
    updateLocal();
    addText.value = '';
}
