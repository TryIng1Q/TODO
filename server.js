const SERVER_FUNCTIONS = {
	changeTodoList(currentTodoOwner) {
		localStorage.setItem('currentOwner', currentTodoOwner.getAttribute('ownerType'));
	},
	todoOwnerInit() {
		if (localStorage.getItem('currentOwner')) {
			return;
		}
		localStorage.setItem('currentOwner', 'my')
	},
	createOwnerObject(ownerType) {
		if (localStorage.getItem(`${ownerType}List`)) {
			return
		}
		localStorage.setItem(`${ownerType}List`, '[]');
	},
	async appendNewTodoServer(todoDeskr) {
		if (todoDeskr.length === 0) return false;

		const currentOwner = localStorage.getItem('currentOwner');
		const todoID = await(fetch('http://localhost:3000/api/todos', {
			method: 'POST',
			body: JSON.stringify({
				name: todoDeskr, 
				owner: currentOwner,
				done: false,
			}),
		}));

		return todoID;
	},
	appendNewTodoStorage(todoDeskr) {
		if (todoDeskr.length === 0) return false;

		const currentOwner = localStorage.getItem('currentOwner');
		const ownerTodoList = JSON.parse(localStorage.getItem(`${currentOwner}List`));
	
		ownerTodoList.push({
			name: todoDeskr,
			status: false,
		});

		localStorage.setItem(`${currentOwner}List`, JSON.stringify(ownerTodoList));

		return {
			name: todoDeskr,
			status: false,
		};
	},
	storageInit() {
		const storageType = localStorage.getItem('storageType');
		const changeStorageWrapper = document.querySelector('.storage__wrapper');

		if (storageType === 'server') {
			changeStorageWrapper.classList.add('active--storage');
		};

		if (storageType) {
			return storageType;
		};

		localStorage.setItem('storageType', 'localStorage');
	},
	storageChange() {
		const storageType = localStorage.getItem('storageType');

		if (storageType === 'localStorage') {
			localStorage.setItem('storageType', 'server');
		} else if (storageType === 'server') {
			localStorage.setItem('storageType', 'localStorage');
		};
	},
};
export default SERVER_FUNCTIONS;