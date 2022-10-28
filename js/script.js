'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
let toDoData = [];



if (localStorage.todo) {
    toDoData = JSON.parse(localStorage.getItem('todo'));
}
const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
            localStorage.setItem('todo', [JSON.stringify(toDoData)]);
        } else {
            todoList.append(li);
            localStorage.setItem('todo', [JSON.stringify(toDoData)]);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', function () {
            li.remove();

            toDoData.splice(index, 1);
            render();
            console.log(toDoData);
            localStorage.setItem('todo', [JSON.stringify(toDoData)]);

        });

    });

};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value === '') {
        alert('Вы не ввели текст');
    } else {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        toDoData.push(newToDo);

        localStorage.setItem('todo', [JSON.stringify(toDoData)]);
        headerInput.value = '';

        render();
    }

});
render();
