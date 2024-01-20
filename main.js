import VISUAL_FUNCTIONS from "./visual.js";
import SERVER_FUNCTIONS from "./server.js";

// Memory owner
SERVER_FUNCTIONS.todoOwnerValidation();
VISUAL_FUNCTIONS.todoOwnerMemory();

// Init owners button
const changeOwnerButtons = document.querySelectorAll('.owner > .owner__wrapper');
changeOwnerButtons.forEach(ownerButton => {
	SERVER_FUNCTIONS.createOwnerObject(ownerButton.getAttribute('ownerType'));

	ownerButton.addEventListener('click', function(event) {
		event.preventDefault();

		VISUAL_FUNCTIONS.todoOwnerChanger(this, changeOwnerButtons);
		SERVER_FUNCTIONS.changeTodoList(this);
	});
});

// Draw owner todo list
VISUAL_FUNCTIONS.drawOwnerTodoList();

// Init form actions
const formInput = document.querySelector('.from-todo > .from-todo__input');
const formDelButton = document.querySelector('.from-todo > .from-todo__del-btn');
const formAddButton = document.querySelector('.from-todo > .from-todo__add-btn');

formDelButton.addEventListener('click', (event) => {
	event.preventDefault();

	formInput.value = '';
});
formAddButton.addEventListener('click', (event) => {
	event.preventDefault();

	const functionAnswer = SERVER_FUNCTIONS.appendNewTodo(formInput.value);

	// Validation
	if (functionAnswer) {
		VISUAL_FUNCTIONS.drawTodo(formInput.value);

		formInput.classList.remove('error-input');
		formInput.placeholder = '';
		formInput.value = '';
	} else {
		formInput.classList.add('error-input');
		formInput.placeholder = 'Вы забыли про задание :(';
	}
});
