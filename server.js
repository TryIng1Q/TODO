const SERVER_FUNCTIONS = {
	changeTodoList(currentTodoOwner) {
		localStorage.setItem('currentOwner', currentTodoOwner.getAttribute('ownerType'));
	},
	todoOwnerValidation() {
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
	appendNewTodo(todoDeskr) {
		if (todoDeskr.length === 0) return false;

		const currentOwner = localStorage.getItem('currentOwner');
		const ownerTodoList = JSON.parse(localStorage.getItem(`${currentOwner}List`));

		ownerTodoList.push({
			text: todoDeskr,
			status: false,
		});

		localStorage.setItem(`${currentOwner}List`, JSON.stringify(ownerTodoList));

		return true;
	},
};
export default SERVER_FUNCTIONS;