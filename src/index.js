import "./styles.css";
import "./modules/todoManager";
import "./modules/domManager";


//Toggle add project form
const showAddProjectBtn = document.getElementById('add-projects-button');
const cancelAddProjectButton = document.getElementById('cancel-add-project');
const addProjectContainer = document.getElementById('add-project-container');

showAddProjectBtn.addEventListener('click', () => {
    addProjectContainer.classList.toggle('hidden');
});

cancelAddProjectButton.addEventListener('click', () => {
    addProjectContainer.classList.add('hidden');
    document.getElementById('add-project-form').reset();
});

//Toggle add todo form
const cancelTodoButton = document.getElementById('cancel-todo-button');

cancelTodoButton.addEventListener('click', () => {
    document.getElementById('add-todo-container').classList.add('hidden');
    document.getElementById('add-todo-form').reset();
})
