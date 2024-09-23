const newTask = document.querySelector("#newTask");
const btnAddTask = document.querySelector("#btnAddTask");
const tasks = document.querySelector(".task-list")


function createLi() {
   const newElement = document.createElement('li')
   return newElement;
};

function clearInput() {
   newTask.value = '';
   newTask.focus();
}

function createClearBtn(task) {
   task.innerHTML += ' ';
   const clearButton = document.createElement("button"); 
   clearButton.innerText = 'Apagar';
   clearButton.setAttribute("id", "clearBtn");
   task.appendChild(clearButton);
   clearButton.addEventListener('click', (e) => {
      e.target.parentElement.remove();
      saveTask();
   })
}

function createTask(newTask) {
   const newElement = createLi();
   newElement.innerHTML = newTask;
   tasks.appendChild(newElement);
   clearInput();
   createClearBtn(newElement);
   saveTask();
}

newTask.addEventListener("keypress", (e) => {
   if (e.keyCode === 13) {
      if (!newTask.value) return;
      createTask(newTask.value);
   }
});

btnAddTask.addEventListener("click", (e) => {
   if (!newTask.value) return;
   createTask(newTask.value);
});

function saveTask() {
   const allLi = tasks.querySelectorAll('li');
   const taskList = [];

   for (let task of allLi) {
      let text = task.innerText;
      text = text.replace('Apagar', '').trim();
      taskList.push(text);
   }

   const tasksJSON = JSON.stringify(taskList);
   localStorage.setItem('tarefas', tasksJSON);
}

function savedTasks() {
   const tasks = localStorage.getItem('tarefas');
   const taskList = JSON.parse(tasks);
   
   for(let task of taskList) {
      createTask(task);
   }
}

savedTasks();