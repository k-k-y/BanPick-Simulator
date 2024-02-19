// implement champion hover, clicked function

let clickedElement = null;

function deleteDisabled() {
	let status = '';
	if (turnCounter >= 0 && turnCounter <= 9) {
		status = 'banned';
	} else {
		status = 'selected';
	}

	if (clickedElement !== null) {
		clickedElement.classList.remove('champ-block-pointer');
		clickedElement.firstChild.classList.remove('champ-block-pointer');
		clickedElement.firstChild.firstChild.classList.remove('champ-block-pointer', 'champ-selected');
	}
}

function selectChamp(cur) {
	let status = '';
	if (turnCounter >= 0 && turnCounter <= 9) {
		status = 'banned';
	} else {
		status = 'selected';
	}

	cur.classList.add('champ-block-pointer');
	cur.firstChild.classList.add('champ-block-pointer');
	cur.firstChild.firstChild.classList.add('champ-selected', 'champ-block-pointer');
	clickedElement = cur;
}

function handleClickChamp(event) {
	const cur = event.target;

	if (cur.matches('.banpick__body-middle__champ')) {
		deleteDisabled();
		selectChamp(cur);
	} else if (cur.matches('.banpick__body-middle__champ div')) {
		deleteDisabled();
		selectChamp(cur.parentElement);
	} else if (cur.matches('.banpick__body-middle__champ img')) {
		deleteDisabled();
		selectChamp(cur.parentElement.parentElement);
	}
}

function handleMouseoverChamp(event) {
	const cur = event.target;

	let status = '';
	if (turnCounter >= 0 && turnCounter <= 9) {
		status = 'banned';
	} else {
		status = 'selected';
	}

	if (cur.matches('.banpick__body-middle__champ div')) {
		cur.classList.add(`champ-${status}__border`);
	} else if (cur.matches('.banpick__body-middle__champ img')) {
		cur.parentElement.classList.add(`champ-${status}__border`);
	} else if (cur.matches('.banpick__body-middle__champ')) {
		cur.firstChild.classList.add(`champ-${status}__border`);
	}
}

function handleMouseoutChamp(event) {
	const cur = event.target;

	let status = '';
	if (turnCounter >= 0 && turnCounter <= 9) {
		status = 'banned';
	} else {
		status = 'selected';
	}
	if (cur.matches('.banpick__body-middle__champ div')) {
		cur.classList.remove(`champ-${status}__border`);
	} else if (cur.matches('.banpick__body-middle__champ img')) {
		cur.parentElement.classList.remove(`champ-${status}__border`);
	} else if (cur.matches('.banpick__body-middle__champ')) {
		cur.firstChild.classList.remove(`champ-${status}__border`);
	}
}
// eventListener

championsDiv.addEventListener('click', handleClickChamp);
championsDiv.addEventListener('mouseover', handleMouseoverChamp);
championsDiv.addEventListener('mouseout', handleMouseoutChamp);
