const VISUAL_FUNCTIONS = {
	todoOwnerChanger(activeButton, changeOwnersButtons) {
		changeOwnersButtons.forEach(ownerButton => {
			ownerButton.classList.remove('owner-active');
		});
		activeButton.classList.add('owner-active');
	},
	todoOwnerMemory() {
		const activeOwner = localStorage.getItem('currentOwner');
		const activeOwnerButton = document.querySelector(`.owner > .owner__wrapper[ownerType="${activeOwner}"]`);
	
		activeOwnerButton.classList.add('owner-active');
	},
	drawTodo(todoDeskr, {input ,todoStatus = false}) {
		// Validation
		if (todoDeskr.length === 0) {
			input.classList.add('error-input');
			input.placeholder = 'Вы забыли про задание :(';
		} else {
			input.classList.remove('error-input');
			input.value = '';
		}

		const todoContainer = document.querySelector('.main');
	
		const todoWrapper = document.createElement('section');
		const todoDeskrWrapper = document.createElement('p');
		const todoDoneButton = document.createElement('button');
		const todoDelButton = document.createElement('button');

		todoWrapper.classList.add('todo');

		todoDeskrWrapper.classList.add('todo__deskr');
		todoDeskrWrapper.textContent = todoDeskr;

		todoDoneButton.classList.add('todo__done-btn');
		todoDoneButton.textContent = 'Done';

		todoDelButton.classList.add('todo__del-btn');
		todoDelButton.textContent = 'Delete';

		// Append to container
		todoWrapper.append(todoDeskrWrapper);
		todoWrapper.append(todoDoneButton);
		todoWrapper.append(todoDelButton);
		todoContainer.append(todoWrapper);
	},
};

export default VISUAL_FUNCTIONS;