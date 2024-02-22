// implement of text input functions

function handlePressEnter(event) {
	// prevent to enter twice (Korean language)
	if (event.isComposing) {
		return;
	}

	if (event.key === 'Enter' && inputBox.value !== '') {
		createText(inputBox.value);
	}
}

function createText(value) {
	const textBox = document.querySelector('.banpick__chat__text-box');
	const text = document.createElement('div');
	text.classList.add('banpick__chat__text');

	const span1 = document.createElement('span');
	const span2 = document.createElement('span');
	span1.innerText = 'Player 1';
	span2.innerText = ` : ${value}`;

	text.appendChild(span1);
	text.appendChild(span2);
	textBox.prepend(text);

	// clear input
	inputBox.value = '';

	// place scrollbar to bottom
	textBox.scrollTop = textBox.scrollHeight;
}

// eventListener

inputBox.addEventListener('keydown', handlePressEnter);
