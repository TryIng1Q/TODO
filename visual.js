const VISUAL_FUNCTIONS = {
	currentId: 0,

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
	drawTodo(todoDeskr, todoStatus) {
		const todoContainer = document.querySelector('.main');
	
		const todoWrapper = document.createElement('section');
		const todoDeskrWrapper = document.createElement('p');
		const todoDoneButton = document.createElement('button');
		const todoDelButton = document.createElement('button');

		// Add buttons events
		todoDoneButton.addEventListener('click', function() {
			const elementID = this.parentElement.getAttribute('list_id');
			const ownerList = VISUAL_FUNCTIONS.getStorageList('get');

			if (ownerList[elementID].status) {
				ownerList[elementID].status = false;
			} else {
				ownerList[elementID].status = true;
			};

			VISUAL_FUNCTIONS.getStorageList('set', JSON.stringify(ownerList));
		});
		todoDelButton.addEventListener('click', function() {
			const elementID = this.parentElement.getAttribute('list_id');
			const ownerList = VISUAL_FUNCTIONS.getStorageList('get');

			for (let i = Number(elementID) + 1; i < ownerList.length; i++) {
				const oldElement= document.querySelector(`.todo[list_id="${i}"]`)
				oldElement.setAttribute('list_id', i - 1);
			};

			ownerList.splice(elementID, 1);
			todoWrapper.remove();

			VISUAL_FUNCTIONS.getStorageList('set', JSON.stringify(ownerList));
		});

		todoWrapper.classList.add('todo');
		todoWrapper.setAttribute('list_id', this.currentId++)

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
	drawOwnerTodoList() {
		const currentOwner = localStorage.getItem('currentOwner');
		const ownerTodoList = JSON.parse(localStorage.getItem(`${currentOwner}List`));

		for (let i = 0; i <= ownerTodoList.length - 1; i++) {
			this.drawTodo(ownerTodoList[i].text, ownerTodoList[i].status);
		}
	},
	getStorageList(type = 'get', changeOwnerList = []) {
		const ownerType = localStorage.getItem('currentOwner');

		if (type === 'get') return JSON.parse(localStorage.getItem(`${ownerType}List`));
		else if (type === 'set') localStorage.setItem(`${ownerType}List`, changeOwnerList);
	},
};

export default VISUAL_FUNCTIONS;