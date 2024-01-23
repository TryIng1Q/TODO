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
	drawTodo(todoDeskr, todoStatus, id = '') {
		const todoContainer = document.querySelector('.todo_container');
	
		const todoWrapper = document.createElement('section');
		const todoDeskrWrapper = document.createElement('p');
		const todoDoneButton = document.createElement('button');
		const todoDelButton = document.createElement('button');

		// Add buttons events
		todoDoneButton.addEventListener('click', async function() {
			const storageType = localStorage.getItem('storageType');

			if (storageType === 'localStorage') {
				const elementID = this.parentElement.getAttribute('list_id');
				const ownerList = VISUAL_FUNCTIONS.getStorageList('get');

				if (ownerList[elementID].status) {
					ownerList[elementID].status = false;
				} else {
					ownerList[elementID].status = true;
				};

				VISUAL_FUNCTIONS.getStorageList('set', JSON.stringify(ownerList));
			} else if (storageType === 'server') {
				const currentTodo = await (await fetch(`http://localhost:3000/api/todos/${id}`)).json(); 

				if (currentTodo.done) {
					currentTodo.done = false;
				} else {
					currentTodo.done = true;
				};

				fetch(`http://localhost:3000/api/todos/${id}`, {
					method: 'PATCH',
					body: JSON.stringify(currentTodo),
				});
			}

			todoWrapper.classList.toggle('todo-status-done');
		});
		todoDelButton.addEventListener('click', function() {
			const storageType = localStorage.getItem('storageType');

			if (storageType === "localStorage") {
				const elementID = this.parentElement.getAttribute('list_id');
				const ownerList = VISUAL_FUNCTIONS.getStorageList('get');
	
				for (let i = Number(elementID) + 1; i < ownerList.length; i++) {
					const oldElement= document.querySelector(`.todo[list_id="${i}"]`)
					oldElement.setAttribute('list_id', i - 1);
				};
	
				ownerList.splice(elementID, 1);
	
				VISUAL_FUNCTIONS.getStorageList('set', JSON.stringify(ownerList));
			} else if (storageType === "server") {
				fetch(`http://localhost:3000/api/todos/${id}`, {
					method: 'DELETE',
				});
			};
			todoWrapper.remove();
		});

		// Status style
		if (todoStatus) {
			todoWrapper.classList.add('todo-status-done');
		};

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
	async drawOwnerTodoList() {
		const currentOwner = localStorage.getItem('currentOwner');
		const storageType = localStorage.getItem('storageType');

		if (storageType === 'localStorage') {
			const ownerStorageTodoList = JSON.parse(localStorage.getItem(`${currentOwner}List`));

			for (let i = 0; i <= ownerStorageTodoList.length - 1; i++) {
				this.drawTodo(ownerStorageTodoList[i].text, ownerStorageTodoList[i].status);
			}; 
		} else if (storageType === 'server') {
			const ownerServerTodoList = await (await(fetch(`http://localhost:3000/api/todos?owner=${currentOwner}`))).json();

			for (let i = 0; i <= ownerServerTodoList.length - 1; i++) {
				this.drawTodo(ownerServerTodoList[i].name, ownerServerTodoList[i].done, ownerServerTodoList[i].id);
			}; 
		};
	},
	getStorageList(type = 'get', changeOwnerList = []) {
		const ownerType = localStorage.getItem('currentOwner');

		if (type === 'get') return JSON.parse(localStorage.getItem(`${ownerType}List`));
		else if (type === 'set') localStorage.setItem(`${ownerType}List`, changeOwnerList);
	},
};

export default VISUAL_FUNCTIONS;