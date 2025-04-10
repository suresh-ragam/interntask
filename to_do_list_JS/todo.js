const input = document.getElementById('task-input');
const addButton = document.getElementById('add-task');
const taskList = document.querySelector('.todo-list');
const themeBtn = document.getElementById('theme-switch');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => renderTask(task.text, task.completed));
});

// Save tasks to localStorage
function saveTasks() {
    const updatedTasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const text = li.querySelector('label')?.textContent || li.querySelector('input.edit-input')?.value;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        updatedTasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function renderTask(taskText, isCompleted = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const label = document.createElement('label');
    label.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.className = 'btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.className = 'btn';

    checkbox.addEventListener('change', saveTasks);

    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'edit') {
            const inputEdit = document.createElement('input');
            inputEdit.type = "text";
            inputEdit.value = label.textContent;
            inputEdit.classList.add('edit-input');

            li.replaceChild(inputEdit, label);
            editBtn.textContent = 'save';

            inputEdit.focus();

            inputEdit.addEventListener("keydown", (e) => {
                if (e.key === 'Enter') {
                    const newText = inputEdit.value.trim();

                    if (newText === '') {
                        alert('Enter a non-empty value');
                        inputEdit.focus();
                        return;
                    }

                    label.textContent = newText;
                    li.replaceChild(label, inputEdit);
                    editBtn.textContent = 'edit';
                    saveTasks();
                }
            });
        } else {
            const inputEdit = li.querySelector('.edit-input');
            const newText = inputEdit.value.trim();

            if (newText === '') {
                alert('Enter a non-empty value');
                inputEdit.focus();
                return;
            }

            label.textContent = newText;
            li.replaceChild(label, inputEdit);
            editBtn.textContent = 'edit';
            saveTasks();
        }
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.append(checkbox);
    li.append(label);
    li.append(editBtn);
    li.append(deleteBtn);

    taskList.append(li);
}

addButton.addEventListener('click', () => {
    const taskText = input.value.trim();

    if (taskText === "") return;

    renderTask(taskText);
    saveTasks();

    input.value = '';
    addButton.disabled = true;
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        addButton.click();
    }
});

input.addEventListener('input', () => {
    addButton.disabled = input.value.trim() === "";
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkmode');
});
