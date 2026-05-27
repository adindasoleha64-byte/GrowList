function addTaskInput(taskText = "", completed = false) {

  const container = document.getElementById("task-container");

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  // CHECKBOX
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  checkbox.addEventListener("change", () => {

    checkAllCompleted();
    saveTasks();
    updateProgress();

  });

  // INPUT
  const input = document.createElement("input");
  input.type = "text";
  input.className = "inline-input";
  input.placeholder = "Tulis tugas di sini...";
  input.value = taskText;

  // SAVE SAAT NGETIK
  input.addEventListener("input", saveTasks);

  // ENTER = TAMBAH TASK BARU
  input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

      e.preventDefault();

      addTaskInput();

      saveTasks();
      updateProgress();
    }
  });

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(input);

  container.appendChild(taskDiv);

  updateProgress();

  input.focus();
}

function saveTasks() {

  const tasks = [];

  document.querySelectorAll(".task").forEach(task => {

    const checkbox =
      task.querySelector("input[type='checkbox']");

    const input =
      task.querySelector(".inline-input");

    tasks.push({
      text: input.value,
      completed: checkbox.checked
    });

  });

  localStorage.setItem(
    "growlist-tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {

  const savedTasks = JSON.parse(
    localStorage.getItem("growlist-tasks")
  ) || [];

  const container =
    document.getElementById("task-container");

  container.innerHTML = "";

  // kalau belum ada task
  if (savedTasks.length === 0) {

    addTaskInput();

    return;
  }

  savedTasks.forEach(task => {

    addTaskInput(task.text, task.completed);

  });

  updateProgress();
}

function updateProgress() {

  const checkboxes = document.querySelectorAll(
    "#task-container input[type='checkbox']"
  );

  const totalTasks = checkboxes.length;

  const completedTasks =
    Array.from(checkboxes)
      .filter(cb => cb.checked).length;

  let progress = 0;

  if (totalTasks > 0) {

    progress =
      (completedTasks / totalTasks) * 100;
  }

  const progressFill =
    document.getElementById("progress-fill");

  if (progressFill) {

    progressFill.style.width = progress + "%";
  }
}

function checkAllCompleted() {

  const checkboxes = document.querySelectorAll(
    "#task-container input[type='checkbox']"
  );

  if (checkboxes.length === 0) return;

  const allChecked =
    Array.from(checkboxes).every(cb => cb.checked);

  if (allChecked) {

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function deleteTask() {

  const container =
    document.getElementById("task-container");

  if (container.lastChild) {

    container.removeChild(container.lastChild);

    saveTasks();
    updateProgress();
  }
}

function clearTasks() {

  const confirmDelete = confirm(
    "Delete all tasks? This cannot be undone."
  );

  if (confirmDelete) {

    document.getElementById(
      "task-container"
    ).innerHTML = "";

    localStorage.removeItem(
      "growlist-tasks"
    );

    addTaskInput();

    saveTasks();
    updateProgress();
  }
}

function changeTheme(theme) {

  const root = document.documentElement;

  document.body.classList.remove(
    "pixel-mode",
    "forest-mode",
    "ocean-mode"
  );

  document.querySelectorAll(".icon-set").forEach(set => {
    set.style.display = "none";
  });

  // FOREST
  if (theme === "forest") {

    root.style.setProperty('--bg-color', '#e0f7e9');
    root.style.setProperty('--sidebar-color', '#c8e6c9');
    root.style.setProperty('--text-color', '#2e7d32');
    root.style.setProperty('--button-color', '#4caf50');
    root.style.setProperty('--progress-color', '#66bb6a');

    root.style.setProperty(
      '--font-family',
      "'Courier New', monospace"
    );

    document.body.classList.add("forest-mode");

    document.querySelector(
      ".forest-set"
    ).style.display = "flex";
  }

  // OCEAN
  else if (theme === "ocean") {

    root.style.setProperty('--bg-color', '#e0f0ff');
    root.style.setProperty('--sidebar-color', '#b3d9ff');
    root.style.setProperty('--text-color', '#01579b');
    root.style.setProperty('--button-color', '#0288d1');
    root.style.setProperty('--progress-color', '#29b6f6');

    root.style.setProperty(
      '--font-family',
      "'Courier New', monospace"
    );

    document.body.classList.add("ocean-mode");

    document.querySelector(
      ".ocean-set"
    ).style.display = "flex";
  }

  // PIXEL
  else if (theme === "pixel") {

    root.style.setProperty('--bg-color', '#fff8e1');
    root.style.setProperty('--sidebar-color', '#ffe082');
    root.style.setProperty('--text-color', '#5d4037');
    root.style.setProperty('--button-color', '#ff7043');
    root.style.setProperty('--progress-color', '#ff7043');

    root.style.setProperty(
      '--font-family',
      "'Press Start 2P', monospace"
    );

    document.body.classList.add("pixel-mode");

    document.querySelector(
      ".pixel-set"
    ).style.display = "flex";
  }

  localStorage.setItem(
    "growlist-theme",
    theme
  );
}

function loadTheme() {

  const savedTheme =
    localStorage.getItem(
      "growlist-theme"
    ) || "forest";

  const themePicker =
    document.getElementById(
      "theme-picker"
    );

  if (themePicker) {

    themePicker.value = savedTheme;
  }

  changeTheme(savedTheme);
}

// LOAD AWAL
loadTheme();
loadTasks();

window.addEventListener("load", () => {

  setTimeout(() => {

    const splash = document.getElementById("splash-screen");

    splash.style.opacity = "0";

    setTimeout(() => {

      splash.style.display = "none";

    }, 800);

  }, 1800);

});