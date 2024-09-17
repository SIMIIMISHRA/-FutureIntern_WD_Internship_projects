document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            text: taskText,
            addedAt: new Date().toLocaleString(),
            completedAt: null
        };

        addTaskToList(task, 'pending');
        taskInput.value = '';
    });

    function addTaskToList(task, status) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text} 
            <span class="date-time">Added at: ${task.addedAt}${task.completedAt ? `<br>Completed at: ${task.completedAt}` : ''}</span>
            <button class="complete" onclick="markAsComplete(this)">Complete</button>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;

        if (status === 'pending') {
            pendingTasksList.appendChild(li);
        } else {
            completedTasksList.appendChild(li);
        }
    }

    window.markAsComplete = function(button) {
        const li = button.parentElement;
        const taskText = li.textContent.trim().split('Added at: ')[0];
        const task = {
            text: taskText,
            addedAt: li.querySelector('.date-time').textContent.split('Added at: ')[1].split('Completed at: ')[0],
            completedAt: new Date().toLocaleString()
        };

        li.remove();
        addTaskToList(task, 'completed');
    };

    window.editTask = function(button) {
        const li = button.parentElement;
        const taskText = prompt('Edit Task:', li.textContent.trim().split('Added at: ')[0]);
        if (taskText !== null && taskText.trim() !== '') {
            li.childNodes[0].textContent = taskText;
        }
    };

    window.deleteTask = function(button) {
        if (confirm('Are you sure you want to delete this task?')) {
            button.parentElement.remove();
        }
    };
});
