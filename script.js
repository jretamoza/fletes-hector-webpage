document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const notesInput = document.getElementById('notes-input');

    // Load tasks and notes from local storage
    loadTasks();
    loadNotes();

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskAction);
    notesInput.addEventListener('input', saveNotes);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        createTaskElement(taskText, false); // Create new task, not completed
        taskInput.value = '';
        saveTasks();
    }

    function createTaskElement(text, isCompleted) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (isCompleted) {
            li.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&#x2714;'; // Checkmark
        completeBtn.className = 'complete-btn';
        completeBtn.title = "Mark as complete";


        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#x1F5D1;'; // Trash can
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = "Delete task";


        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    }

    function handleTaskAction(event) {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return;

        if (target.classList.contains('complete-btn') || target.parentElement.classList.contains('complete-btn')) {
            taskItem.classList.toggle('completed');
        } else if (target.classList.contains('delete-btn') || target.parentElement.classList.contains('delete-btn')) {
            taskItem.remove();
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list .task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('dailyPlannerTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('dailyPlannerTasks'));
        if (tasks) {
            tasks.forEach(task => createTaskElement(task.text, task.completed));
        }
    }

    function saveNotes() {
        localStorage.setItem('dailyPlannerNotes', notesInput.value);
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('dailyPlannerNotes');
        if (savedNotes) {
            notesInput.value = savedNotes;
        }
    }
});
