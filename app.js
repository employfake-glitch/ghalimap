const STORAGE_KEY = "taskflow-tasks";
const THEME_KEY = "taskflow-theme";

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const taskCount = document.querySelector("#taskCount");
const clearCompleted = document.querySelector("#clearCompleted");
const clearAll = document.querySelector("#clearAll");
const themeToggle = document.querySelector("#themeToggle");
const filters = document.querySelectorAll(".filter");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  taskList.innerHTML = visibleTasks.map((task) => `
    <li class="task ${task.completed ? "completed" : ""}">
      <input class="check" type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""} aria-label="Mark task complete">
      <span class="task-title">${escapeHtml(task.title)}</span>
      <button class="delete-button" type="button" data-delete="${task.id}" aria-label="Delete task">×</button>
    </li>
  `).join("");

  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
  emptyState.hidden = visibleTasks.length > 0;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false
  });

  saveTasks();
  taskInput.value = "";
  render();
  taskInput.focus();
});

taskList.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".check");
  if (!checkbox) return;

  const task = tasks.find((item) => item.id === checkbox.dataset.id);
  if (!task) return;

  task.completed = checkbox.checked;
  saveTasks();
  render();
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;

  tasks = tasks.filter((task) => task.id !== button.dataset.delete);
  saveTasks();
  render();
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    currentFilter = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === filter));
    render();
  });
});

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

clearAll.addEventListener("click", () => {
  if (!tasks.length) return;
  if (!confirm("Delete all tasks?")) return;

  tasks = [];
  saveTasks();
  render();
});

function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

const savedTheme = localStorage.getItem(THEME_KEY);
setTheme(savedTheme === "dark" ? "dark" : "light");
render();
