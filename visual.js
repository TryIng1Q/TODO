// Объект содержащий все функции отвечающие за отрисовку DOM дерева

const VISUAL_FUNCTIONS = {
	todoTypeChanger(elements) {
		elements.forEach(owner => {
			console.log(owner);
		});
	},
};

export default VISUAL_FUNCTIONS;

// owner.addEventListener('click', (event) => {
// 	event.preventDefault();

// 	console.log(owner.getAttribute('ownerType'));
// });