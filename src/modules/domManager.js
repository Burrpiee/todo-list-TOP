import todoManager from './todoManager';



//Close todo details
const closeDetailButton = document.getElementById('close-details-button');
const todoDetailsContainer = document.getElementById('todo-details');
closeDetailButton.addEventListener('click', () => {
    todoDetailsContainer.classList.add('hidden');
});
