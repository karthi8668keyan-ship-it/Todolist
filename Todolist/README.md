# Ex03 To-Do List using JavaScript
## Date:

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do App</title>
    <link rel="stylesheet" href="style.css">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="app-container">
        <header>
            <h1><i class="fa-solid fa-list-check"></i> Tasks</h1>
        </header>
        
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter a new task...">
            <button id="addBtn"><i class="fa-solid fa-plus"></i></button>
        </div>

        <ul id="taskList">
            <!-- Tasks will be injected here by JavaScript -->
        </ul>
        
        <div class="stats">
            <span id="taskCount">0 tasks pending</span>
            <button id="clearAllBtn">Clear All</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
### style.css
```css
/* Core Setup */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #000000; /* Deep AMOLED black */
    color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Main Application Container */
.app-container {
    background-color: #0c0c0c;
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid #1a1a1a;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.15), 
                inset 0 0 10px rgba(0, 243, 255, 0.05); /* Neon blue accent glow */
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 8px rgba(0, 243, 255, 0.6);
}

header h1 i {
    color: #00f3ff;
}

/* Input Area */
.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 1.5rem;
}

#taskInput {
    flex: 1;
    background-color: #121212;
    border: 1px solid #333;
    padding: 12px 15px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
}

#taskInput:focus {
    border-color: #00f3ff;
    box-shadow: 0 0 8px rgba(0, 243, 255, 0.3);
}

#addBtn {
    background-color: transparent;
    color: #00f3ff;
    border: 1px solid #00f3ff;
    padding: 0 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

#addBtn:hover {
    background-color: #00f3ff;
    color: #000000;
    box-shadow: 0 0 12px rgba(0, 243, 255, 0.6);
}

/* Task List */
#taskList {
    list-style: none;
    max-height: 350px;
    overflow-y: auto;
}

#taskList::-webkit-scrollbar {
    width: 6px;
}
#taskList::-webkit-scrollbar-thumb {
    background: #00f3ff;
    border-radius: 10px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #161616;
    margin-bottom: 10px;
    padding: 12px 15px;
    border-radius: 6px;
    border-left: 3px solid #00f3ff;
    transition: all 0.2s ease;
}

.task-item:hover {
    background-color: #1e1e1e;
}

.task-item.completed {
    border-left-color: #4caf50;
    opacity: 0.6;
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: #888;
}

.task-text {
    flex: 1;
    margin: 0 15px;
    font-size: 1rem;
    cursor: pointer;
    word-break: break-all;
}

/* Action Buttons */
.task-actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 5px;
    margin-left: 5px;
    transition: 0.2s;
}

.check-btn { color: #555; }
.task-item.completed .check-btn { color: #4caf50; text-shadow: 0 0 5px rgba(76, 175, 80, 0.5); }
.delete-btn { color: #ff3366; }
.delete-btn:hover { text-shadow: 0 0 8px rgba(255, 51, 102, 0.6); }

/* Footer Stats */
.stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #888;
}

#clearAllBtn {
    background: none;
    border: 1px solid #ff3366;
    color: #ff3366;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

#clearAllBtn:hover {
    background: #ff3366;
    color: #000;
    box-shadow: 0 0 10px rgba(255, 51, 102, 0.6);
}
```
### script.js
```js
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
```
## OUTPUT
![alt text](image.png)
## RESULT
The program for creating To-do list using JavaScript is executed successfully.
