const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const filterButtons = document.querySelectorAll(".filter-button");

let tasks = [];
let currentFilter = "all";

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);

    renderTasks();
}

function toggleTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

function getFilteredTasks() {
    if (currentFilter === "pending") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {
        const listItem = document.createElement("li");

        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("task-item--completed");
        }

        listItem.innerHTML = `
            <div class="task-item__content">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})"
                >

                <span class="task-item__text">
                    ${task.title}
                </span>
            </div>

            <button
                type="button"
                class="task-item__delete"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>
        `;

        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const totalTasks = tasks.length;

    taskCount.textContent =
        `${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`;
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove("filter-button--active");
        });

        button.classList.add("filter-button--active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

renderTasks();