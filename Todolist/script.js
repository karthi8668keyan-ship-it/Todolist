// Select DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize App
function init() {
    renderTasks();
}

// Render Tasks to DOM
function renderTasks() {
    taskList.innerHTML = '';
    let pendingCount = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) pendingCount++;

        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-actions">
                <button class="check-btn" onclick="toggleTask(${index})">
                    <i class="fa-solid fa-circle-check"></i>
                </button>
            </div>
            <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.textContent = `${pendingCount} task${pendingCount !== 1 ? 's' : ''} pending`;
    updateLocalStorage();
}

// Add New Task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Toggle Task Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete Single Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Clear All Tasks
function clearAll() {
    tasks = [];
    renderTasks();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearAllBtn.addEventListener('click', clearAll);

// Run Initialization
init();