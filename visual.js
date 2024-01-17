// Объект содержащий все функции отвечающие за отрисовку DOM дерева

const VISUAL_FUNCTIONS = {
	todoTypeChanger(element) {
		ownersBtn.forEach(owner => {
			owner.addEventListener('click', (event) => {
				event.preventDefault();
				
				VISUAL_FUNCTIONS.todoTypeChanger(owner);
			});
		});
		console.log(element.getAttribute('ownerType'));
	},
};

export default VISUAL_FUNCTIONS;