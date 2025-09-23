// Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const statusText = document.getElementById('statusText');
const emptyMsg = document.getElementById('emptyMsg');

// State (in-memory)
const tasks = []; // { id, text, completed }
let nextId = 1;

// Render function
function render() {
  taskList.innerHTML = '';
  emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');
    li.setAttribute('data-id', task.id);

    // Label
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = task.text;
    li.appendChild(label);

    // Remove button
    const actions = document.createElement('div');
    actions.className = 'actions';
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeTask(task.id);
    });
    actions.appendChild(removeBtn);
    li.appendChild(actions);

    // Toggle complete
    li.addEventListener('click', () => toggleComplete(task.id));

    taskList.appendChild(li);
  });

  updateStatus();
}

function updateStatus() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  statusText.textContent = `Completed: ${completed} / ${total}`;
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  tasks.push({ id: nextId++, text: trimmed, completed: false });
  render();
}

function removeTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    tasks.splice(idx, 1);
    render();
  }
}

function toggleComplete(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.completed = !t.completed;
    render();
  }
}

// Events
addBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// Initial render
render();
